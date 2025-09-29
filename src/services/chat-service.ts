import { Model, ChatSession } from '../models/index.js';

// Servicio de chat simple
export class ChatService {
  currentSession: ChatSession | null = null;

  // Crear nueva sesión de chat
  createSession(modelName: string): ChatSession {
    const model = new Model(modelName);
    this.currentSession = new ChatSession(model);
    return this.currentSession;
  }

  // Enviar mensaje con streaming
  async* streamMessage(message: string): AsyncGenerator<string> {
    if (!this.currentSession) {
      throw new Error('No hay sesión activa');
    }
    
    for await (const chunk of this.currentSession.streamMessage(message)) {
      yield chunk;
    }
  }

  // Obtener historial de mensajes
  getMessages(): any[] {
    return this.currentSession?.messages || [];
  }
}
