// Conversación simple
export class Conversation {
    constructor(userMessage, aiResponse, modelUsed) {
        this.userMessage = userMessage;
        this.aiResponse = aiResponse;
        this.modelUsed = modelUsed;
        this.timestamp = new Date();
    }
    // Obtener información de la conversación
    getInfo() {
        return {
            userMessage: this.userMessage,
            aiResponse: this.aiResponse,
            modelUsed: this.modelUsed,
            timestamp: this.timestamp
        };
    }
    // Exportar como texto
    exportAsText() {
        return `Usuario: ${this.userMessage}\n\nIA: ${this.aiResponse}`;
    }
}
