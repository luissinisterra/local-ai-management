// Sesión de chat simple
export class ChatSession {
    constructor(model) {
        this.messages = [];
        this.model = model;
    }
    // Enviar mensaje y obtener respuesta
    async sendMessage(userMessage) {
        // Agregar mensaje del usuario
        this.messages.push({
            role: 'user',
            content: userMessage
        });
        // Obtener respuesta del modelo
        const response = await this.model.sendMessage(userMessage);
        // Agregar respuesta de la IA
        this.messages.push({
            role: 'assistant',
            content: response
        });
        return response;
    }
    // Enviar mensaje con streaming
    async *streamMessage(userMessage) {
        // Agregar mensaje del usuario
        this.messages.push({
            role: 'user',
            content: userMessage
        });
        let aiResponse = '';
        // Stream de respuesta del modelo
        for await (const chunk of this.model.streamMessage(userMessage)) {
            aiResponse += chunk;
            yield chunk;
        }
        // Agregar respuesta completa de la IA
        this.messages.push({
            role: 'assistant',
            content: aiResponse
        });
    }
    // Limpiar mensajes
    clearMessages() {
        this.messages = [];
    }
}
