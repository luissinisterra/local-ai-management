import { Model, ChatSession } from "../models/index.js";
import { getActiveTools } from "./tool-service.js";
// Servicio de chat simple
export class ChatService {
    constructor() {
        this.currentSession = null;
    }
    // Crear nueva sesión de chat
    createSession(user, modelName) {
        const modelToUse = modelName || user.defaultModel;
        const model = new Model(modelToUse);
        this.currentSession = new ChatSession(model, user, getActiveTools());
        return this.currentSession;
    }
    // Enviar mensaje con streaming
    async *streamMessage(message) {
        if (!this.currentSession) {
            throw new Error("No hay sesión activa");
        }
        this.currentSession.setTools(getActiveTools());
        for await (const chunk of this.currentSession.streamMessage(message)) {
            yield chunk;
        }
    }
    // Obtener historial de mensajes
    getMessages() {
        var _a;
        return ((_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.messages) || [];
    }
}
