// ...existing code...
import type { Message } from "./interfaces/message.js";
import { Model } from "./Model.js";
import { User } from "./User.js";
import { Conversation } from "./Conversation.js";

// Sesión de chat que hereda de Conversation y asocia un usuario
export class ChatSession extends Conversation {
  // Cambiar el modelo activo de la sesión
  setModel(newModel: Model, updateUserDefault = false): void {
    this.model = newModel;
    if (updateUserDefault) {
      this.user.setDefaultModel(newModel.name);
    }
  }

  setTools(tools: Object[]) {
    this.toolsJson = tools;
  }

  history: string | null = null;
  messages: Message[] = [];
  model: Model;
  user: User;
  toolsJson: Object[];

  constructor(model: Model, user: User, toolsJson: Object[]) {
    // Inicializa Conversation con valores vacíos
    super("", "", model.name);
    this.model = model;
    this.user = user;
    this.toolsJson = toolsJson;
    this.history = localStorage.getItem("history");

    if (this.history) {
      this.messages = history ? JSON.parse(history ? this.history : "") : [];
    }
    if (localStorage.getItem("messages")) {
      this.messages = JSON.parse(localStorage.getItem("messages") ?? "");
    }
  }

  // Enviar mensaje con streaming
  async *streamMessage(userMessage: string): AsyncGenerator<string> {
    // Agregar mensaje del usuario
    this.messages.push({
      role: "user",
      content: userMessage,
    });

    let aiResponse = "";

    // Stream de respuesta del modelo (solo pasamos messages)
    for await (const chunk of this.model.streamMessage(
      this.messages,
      this.toolsJson,
    )) {
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
  clearMessages(): void {
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
