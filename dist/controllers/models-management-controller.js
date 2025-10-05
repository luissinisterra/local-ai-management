import { ModelService } from "../services/model-service.js";
export default function init(shadow) {
    if (!shadow)
        return;
    console.log("ShadowRoot en init:", shadow);
    console.log("modelsList:", shadow.getElementById("models-list"));
    // Obtener elementos del DOM
    const modelsList = shadow.getElementById("models-list");
    const refreshButton = shadow.getElementById("refresh-models");
    const installButton = shadow.getElementById("install-model");
    const modelInput = shadow.getElementById("model-name");
    // Crear servicio de modelos
    const modelService = new ModelService();
    // Función para cargar modelos disponibles
    async function loadModels() {
        try {
            const models = await modelService.getModels();
            if (modelsList) {
                modelsList.innerHTML = '';
                if (models.length > 0) {
                    models.forEach((model) => {
                        const modelItem = document.createElement('div');
                        modelItem.className = 'model-item';
                        modelItem.innerHTML = `
              <div class="model-info">
                <h3>${model.name}</h3>
                <p>Size: ${(model.size / 1024 / 1024 / 1024).toFixed(2)} GB</p>
              </div>
              <div class="model-actions">
                <button class="btn btn-danger" onclick="deleteModel('${model.name}')">
                  Eliminar
                </button>
              </div>
            `;
                        modelsList.appendChild(modelItem);
                    });
                }
                else {
                    modelsList.innerHTML = '<p>No hay modelos instalados</p>';
                }
            }
        }
        catch (error) {
            console.error('Error loading models:', error);
            if (modelsList) {
                modelsList.innerHTML = '<p>Error al cargar los modelos</p>';
            }
        }
    }
    // Función para instalar un modelo
    async function installModel() {
        const modelName = modelInput === null || modelInput === void 0 ? void 0 : modelInput.value.trim();
        if (!modelName) {
            alert('Please enter a model name');
            return;
        }
        try {
            const success = await modelService.installModel(modelName);
            if (success) {
                alert('Model installation started. Check the console for progress.');
                loadModels(); // Recargar la lista
            }
            else {
                alert('Error installing model');
            }
        }
        catch (error) {
            console.error('Error installing model:', error);
            alert('Error installing model');
        }
    }
    // Función para eliminar un modelo
    async function deleteModel(modelName) {
        if (!confirm(`Are you sure you want to delete ${modelName}?`)) {
            return;
        }
        try {
            const success = await modelService.deleteModel(modelName);
            if (success) {
                alert('Model deleted successfully');
                loadModels(); // Recargar la lista
            }
            else {
                alert('Error deleting model');
            }
        }
        catch (error) {
            console.error('Error deleting model:', error);
            alert('Error deleting model');
        }
    }
    // Event listeners
    if (refreshButton) {
        refreshButton.addEventListener('click', loadModels);
    }
    if (installButton) {
        installButton.addEventListener('click', installModel);
    }
    if (modelInput) {
        modelInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                installModel();
            }
        });
    }
    // Cargar modelos al inicializar
    loadModels();
    // Hacer las funciones globales para los botones inline
    window.deleteModel = deleteModel;
}
