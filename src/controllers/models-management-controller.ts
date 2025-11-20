import { ModelService } from "../services/model-service.js";

export default function init(shadow: ShadowRoot | null) {
  if (!shadow) return;

  console.log("ShadowRoot en init:", shadow);
  console.log("modelsList:", shadow.getElementById("models-list"));

  // Obtener elementos del DOM
  const modelsList = shadow.getElementById("models-list") as HTMLElement;
  const refreshButton = shadow.getElementById("refresh-models") as HTMLElement;
  const installButton = shadow.getElementById("install-model") as HTMLElement;
  const modelInput = shadow.getElementById("model-name") as HTMLInputElement;

  // Crear servicio de modelos
  const modelService = new ModelService();

  // Función para cargar modelos disponibles
  async function loadModels() {
    try {
      const models = await modelService.getModels();

      if (modelsList) {
        modelsList.innerHTML = "";

        if (models.length > 0) {
          models.forEach((model) => {
            const modelItem = document.createElement("div");
            modelItem.className = "model-item";
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
        } else {
          modelsList.innerHTML = "<p>No hay modelos instalados</p>";
        }
      }
    } catch (error) {
      console.error("Error loading models:", error);
      if (modelsList) {
        modelsList.innerHTML = "<p>Error al cargar los modelos</p>";
      }
    }
  }

  // Función para instalar un modelo
  async function installModel() {
    const modelName = modelInput?.value.trim();
    if (!modelName) {
      alert("Ingresa algun modelo");
      return;
    }

    try {
      const success = await modelService.installModel(modelName);
      if (success) {
        alert("Instalando " + modelName);
        loadModels(); // Recargar la lista
      } else {
        alert("Error instalando modelo");
      }
    } catch (error) {
      console.error("Error instalando modelo", error);
      alert("Error instalando modelo");
    }
  }

  // Función para eliminar un modelo
  async function deleteModel(modelName: string) {
    if (!confirm(`Deseas eliminar ${modelName}?`)) {
      return;
    }

    try {
      const success = await modelService.deleteModel(modelName);
      if (success) {
        alert("Modelo eliminado exitosamente");
        loadModels(); // Recargar la lista
      } else {
        alert("Error deleting model");
      }
    } catch (error) {
      console.error("Error deleting model:", error);
      alert("Error deleting model");
    }
  }

  // Event listeners
  if (refreshButton) {
    refreshButton.addEventListener("click", loadModels);
  }

  if (installButton) {
    installButton.addEventListener("click", installModel);
  }

  if (modelInput) {
    modelInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        installModel();
      }
    });
  }

  // Cargar modelos al inicializar
  loadModels();

  // Hacer las funciones globales para los botones inline
  (window as any).deleteModel = deleteModel;
}
