// Modelo simple para representar un modelo de IA
export class Model {
    constructor(name, size = 0) {
        this.name = name;
        this.size = size;
    }
    // Enviar mensaje con streaming
    async *streamMessage(messages) {
        var _a, _b;
        console.log('Modelo enviando mensaje a Ollama:', this.name);
        const url = "http://localhost:11434/api/chat";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: this.name,
                    messages: messages,
                    stream: true,
                }),
            });
            console.log('Respuesta de Ollama:', response.status, response.ok);
            if (!response.ok) {
                throw new Error(`Error de Ollama: ${response.status} ${response.statusText}`);
            }
            const reader = (_a = response.body) === null || _a === void 0 ? void 0 : _a.getReader();
            if (!reader) {
                console.error('No se pudo obtener el reader del stream');
                return;
            }
            const decoder = new TextDecoder();
            let buffer = '';
            while (true) {
                const { value, done } = await reader.read();
                if (done)
                    break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';
                for (const line of lines) {
                    if (!line.trim())
                        continue;
                    try {
                        const json = JSON.parse(line);
                        console.log('JSON recibido:', json);
                        if ((_b = json.message) === null || _b === void 0 ? void 0 : _b.content) {
                            console.log('Enviando chunk:', json.message.content);
                            yield json.message.content;
                        }
                    }
                    catch (err) {
                        console.error('Error parseando JSON:', line, err);
                    }
                }
            }
        }
        catch (error) {
            console.error('Error en streamMessage:', error);
            throw error;
        }
    }
    // Obtener todos los modelos disponibles
    static async getModels() {
        var _a;
        try {
            const response = await fetch('http://localhost:11434/api/tags');
            const data = await response.json();
            return ((_a = data.models) === null || _a === void 0 ? void 0 : _a.map((model) => new Model(model.name, model.size))) || [];
        }
        catch (error) {
            console.error('Error loading models:', error);
            return [];
        }
    }
    getName() {
        return this.name;
    }
}
