// Sesión de chat simple
export class ChatSession {
    constructor(model) {
        this.messages = [];
        this.model = model;
    }
    // Enviar mensaje con streaming
    async *streamMessage(userMessage) {
        // Agregar mensaje del usuario
        this.messages.push({
            role: 'user',
            content: userMessage
        });
        let aiResponse = '';
        // Stream de respuesta del modelo (solo pasamos messages)
        for await (const chunk of this.model.streamMessage(this.messages)) {
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
