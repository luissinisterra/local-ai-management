import { Conversation } from "./Conversation.js";
// Sesión de chat que hereda de Conversation y asocia un usuario
export class ChatSession extends Conversation {
    // Cambiar el modelo activo de la sesión
    setModel(newModel, updateUserDefault = false) {
        this.model = newModel;
        if (updateUserDefault) {
            this.user.setDefaultModel(newModel.name);
        }
    }
    setTools(tools) {
        this.toolsJson = tools;
    }
    constructor(model, user, toolsJson) {
        var _a;
        // Inicializa Conversation con valores vacíos
        super("", "", model.name);
        this.history = null;
        this.messages = [];
        this.model = model;
        this.user = user;
        this.toolsJson = toolsJson;
        this.history = localStorage.getItem("history");
        if (this.history) {
            this.messages = history ? JSON.parse(history ? this.history : "") : [];
        }
        if (localStorage.getItem("messages")) {
            this.messages = JSON.parse((_a = localStorage.getItem("messages")) !== null && _a !== void 0 ? _a : "");
        }
    }
    // Enviar mensaje con streaming
    async *streamMessage(userMessage) {
        // Agregar mensaje del usuario
        this.messages.push({
            role: "user",
            content: userMessage,
        });
        let aiResponse = "";
        // Stream de respuesta del modelo (solo pasamos messages)
        for await (const chunk of this.model.streamMessage(this.messages, this.toolsJson)) {
            aiResponse += chunk;
            yield chunk;
        }
        // Agregar respuesta completa de la IA
        this.messages.push({
            role: "ai",
            content: aiResponse,
        });
        localStorage.setItem("messages", JSON.stringify(this.messages));
        // Actualiza Conversation con los últimos mensajes
        this.userMessage = userMessage;
        this.aiResponse = aiResponse;
        this.modelUsed = this.model.name;
        this.timestamp = new Date();
    }
    // Limpiar mensajes
    clearMessages() {
        this.messages = [];
        localStorage.setItem("messages", "[]");
    }
    // Obtener información de la sesión
    getSessionInfo() {
        return {
            user: this.user.getInfo(),
            model: this.model.name,
            messages: this.messages,
            lastConversation: this.getInfo(),
            tools: this.toolsJson,
        };
    }
}
