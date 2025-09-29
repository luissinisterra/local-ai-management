// Modelo simple para representar un modelo de IA
export class Model {
  name: string;
  size: number;

  constructor(name: string, size: number = 0) {
    this.name = name;
    this.size = size;
  }

  // Enviar mensaje al modelo
  async sendMessage(prompt: string): Promise<string> {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.name,
        prompt: prompt,
        stream: false,
      }),
    });

    const result = await response.json();
    return result.response || '';
  }

  // Enviar mensaje con streaming
  async* streamMessage(prompt: string): AsyncGenerator<string> {
    console.log('Modelo enviando mensaje a Ollama:', this.name, prompt);
    
    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.name,
          prompt: prompt,
          stream: true,
        }),
      });

      console.log('Respuesta de Ollama:', response.status, response.ok);

      if (!response.ok) {
        throw new Error(`Error de Ollama: ${response.status} ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        console.error('No se pudo obtener el reader del stream');
        return;
      }
      
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const json = JSON.parse(line);
            console.log('JSON recibido:', json);
            if (json.response) {
              console.log('Enviando chunk:', json.response);
              yield json.response;
            }
          } catch (err) {
            console.error('Error parseando JSON:', line, err);
          }
        }
      }
    } catch (error) {
      console.error('Error en streamMessage:', error);
      throw error;
    }
  }

  // Obtener todos los modelos disponibles
  static async getModels(): Promise<Model[]> {
    try {
      const response = await fetch('http://localhost:11434/api/tags');
      const data = await response.json();
      
      return data.models?.map((model: any) => new Model(model.name, model.size)) || [];
    } catch (error) {
      console.error('Error loading models:', error);
      return [];
    }
  }
}
