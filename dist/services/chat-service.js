import { Model, ChatSession } from '../models/index.js';
// Servicio de chat simple
export class ChatService {
    constructor() {
        this.currentSession = null;
    }
    // Crear nueva sesión de chat
    createSession(modelName) {
        const model = new Model(modelName);
        this.currentSession = new ChatSession(model);
        return this.currentSession;
    }
    // Enviar mensaje con streaming
    async *streamMessage(message) {
        if (!this.currentSession) {
            throw new Error('No hay sesión activa');
        }
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
