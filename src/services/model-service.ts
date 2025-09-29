import { Model } from '../models/index.js';

// Servicio de modelos simple
export class ModelService {
  // Obtener todos los modelos disponibles
  async getModels(): Promise<Model[]> {
    return await Model.getModels();
  }

  // Instalar un modelo
  async installModel(modelName: string): Promise<boolean> {
    try {
      const response = await fetch('http://localhost:11434/api/pull', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: modelName })
      });
      return response.ok;
    } catch (error) {
      console.error('Error installing model:', error);
      return false;
    }
  }

  // Eliminar un modelo
  async deleteModel(modelName: string): Promise<boolean> {
    try {
      const response = await fetch('http://localhost:11434/api/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: modelName })
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting model:', error);
      return false;
    }
  }
}
