import type { Message } from './interfaces/message.js';
import { Model } from './Model.js';

// Sesión de chat simple
export class ChatSession {
  messages: Message[] = [];
  model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  // Enviar mensaje y obtener respuesta
  async sendMessage(userMessage: string): Promise<string> {
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
  async* streamMessage(userMessage: string): AsyncGenerator<string> {
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
  clearMessages(): void {
    this.messages = [];
  }
}
