import { Model, ChatSession, User } from "../models/index.js";
import { getActiveTools } from "./tool-service.js";

// Servicio de chat simple
export class ChatService {
  currentSession: ChatSession | null = null;

  // Crear nueva sesión de chat
  createSession(user: User, modelName?: string): ChatSession {
    const modelToUse = modelName || user.defaultModel;
    const model = new Model(modelToUse);
    this.currentSession = new ChatSession(model, user, getActiveTools());
    return this.currentSession;
  }

  // Enviar mensaje con streaming
  async *streamMessage(message: string): AsyncGenerator<string> {
    if (!this.currentSession) {
      throw new Error("No hay sesión activa");
    }
    this.currentSession.setTools(getActiveTools());
    for await (const chunk of this.currentSession.streamMessage(message)) {
      yield chunk;
    }
  }

  // Obtener historial de mensajes
  getMessages(): any[] {
    return this.currentSession?.messages || [];
  }
}
