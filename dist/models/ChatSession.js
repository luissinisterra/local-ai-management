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
    constructor(model, user, toolsJson) {
        // Inicializa Conversation con valores vacíos
        super("", "", model.name);
        this.messages = [];
        this.model = model;
        this.user = user;
        this.toolsJson = toolsJson;
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
            role: "assistant",
            content: aiResponse,
        });
        // Actualiza Conversation con los últimos mensajes
        this.userMessage = userMessage;
        this.aiResponse = aiResponse;
        this.modelUsed = this.model.name;
        this.timestamp = new Date();
    }
    // Limpiar mensajes
    clearMessages() {
        this.messages = [];
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
