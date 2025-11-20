// Conversación simple
export class Conversation {
  userMessage: string;
  aiResponse: string;
  modelUsed: string;
  timestamp: Date;

  constructor(userMessage: string, aiResponse: string, modelUsed: string) {
    this.userMessage = userMessage;
    this.aiResponse = aiResponse;
    this.modelUsed = modelUsed;
    this.timestamp = new Date();
  }

  // Obtener información de la conversación
  getInfo(): { userMessage: string; aiResponse: string; modelUsed: string; timestamp: Date } {
    return {
      userMessage: this.userMessage,
      aiResponse: this.aiResponse,
      modelUsed: this.modelUsed,
      timestamp: this.timestamp
    };
  }

  // Exportar como texto
  exportAsText(): string {
    return `Usuario: ${this.userMessage}\n\nIA: ${this.aiResponse}`;
  }
}
