import { ChatService } from "../services/chat-service.js";
import { User } from "../models/User.js";
import { ModelService } from "../services/model-service.js";

export default function init(shadow: ShadowRoot | null) {
  if (!shadow) return;

  const textarea = shadow.getElementById("user-input") as HTMLTextAreaElement;
  const sendButton = shadow.getElementById("user-button") as HTMLElement;
  const chatMessages = shadow.getElementById("chat-messages") as HTMLElement;
  const modelSelect = shadow.getElementById(
    "model-select",
  ) as HTMLSelectElement;
  const toolBtn = shadow.querySelector(".toolButton");
  const toolModal = shadow.getElementById("toolModal");
  const closeToolBtn = shadow.querySelector(".toolModal-close");
  const clearMessagesButton = shadow.querySelector(
    ".clear-messages-button",
  ) as HTMLButtonElement;
  const switchClima = shadow.getElementById("switchClima") as HTMLInputElement;

  //configuracion del switch para herramienta clima
  switchClima.addEventListener("change", () => {
    if (switchClima?.checked) {
      localStorage.setItem("isWeatherToolActive", "true");
    } else {
      localStorage.setItem("isWeatherToolActive", "false");
    }
  });

  clearMessagesButton?.addEventListener("click", () => {
    chatService.currentSession?.clearMessages();
    chatMessages.innerHTML = "";
  });

  //configuracion del tool modal
  toolBtn?.addEventListener("click", () => {
    toolModal?.classList.add("active");
  });

  closeToolBtn?.addEventListener("click", () => {
    toolModal?.classList.remove("active");
  });

  // Cerrar al hacer clic fuera del modal
  window.addEventListener("click", (e) => {
    if (e.target === toolModal) {
      toolModal?.classList.remove("active");
    }
  });

  // Crear usuario (puedes personalizar estos datos)
  const user = new User("usuario_demo", "demo@email.com");

  // Crear servicio de chat
  const chatService = new ChatService();

  // Llenar el selector de modelos dinámicamente usando ModelService
  const modelService = new ModelService();

  async function populateModelSelect() {
    const models = await modelService.getModels();
    modelSelect.innerHTML = "";
    if (models.length === 0) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = "No hay modelos disponibles";
      modelSelect.appendChild(opt);
      modelSelect.disabled = true;
      return;
    }
    models.forEach((model) => {
      const opt = document.createElement("option");
      opt.value = model.name;
      opt.textContent = model.name;
      if (localStorage.getItem("model") === model.name) {
        opt.selected = true;
      }
      modelSelect.appendChild(opt);
    });
    modelSelect.disabled = false;
  }

  // Iniciar sesión de chat con el modelo seleccionado
  function startSession() {
    const selectedModel = modelSelect.value || user.defaultModel;
    localStorage.setItem("model", selectedModel);
    chatService.createSession(user, selectedModel);
  }

  // Inicializar selector y sesión al cargar
  populateModelSelect().then(() => {
    startSession();
  });

  // Permitir cambiar de modelo y reiniciar la sesión
  modelSelect.addEventListener("change", () => {
    localStorage.setItem("model", modelSelect.value);
    startSession();
  });

  async function handleSendMessage() {
    const inputValue: string = textarea.value.trim();
    if (!inputValue) return;

    console.log("Enviando mensaje:", inputValue);
    textarea.value = "";
    addMessageToDOM(inputValue, "user", chatMessages);

    let currentAiMessage: HTMLElement | null = null;

    try {
      console.log("Iniciando streaming...");
      // Enviar mensaje con streaming
      for await (const chunk of chatService.streamMessage(inputValue)) {
        console.log("Recibido chunk:", chunk);
        if (!currentAiMessage) {
          currentAiMessage = addMessageToDOM("", "ai", chatMessages);
        }
        currentAiMessage.textContent += chunk;
      }
      console.log("Streaming completado");
    } catch (error) {
      console.error("Error sending message:", error);
      if (!currentAiMessage) {
        const errorMessage =
          error instanceof Error ? error.message : "Error desconocido";
        currentAiMessage = addMessageToDOM(
          "Error al enviar mensaje: " + errorMessage,
          "ai",
          chatMessages,
        );
      }
    }
  }

  sendButton.addEventListener("click", handleSendMessage);

  textarea.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  });

  function addMessageToDOM(
    content: string,
    sentBy: string,
    parent: HTMLElement,
  ): HTMLElement {
    const newMessageContainer = document.createElement("div");
    const newMessage = document.createElement("p");
    newMessage.textContent = content;
    newMessageContainer.appendChild(newMessage);

    if (sentBy === "user") {
      newMessage.className = "user-message";
    } else if (sentBy === "ai") {
      newMessage.className = "ai-message";
    } else if (sentBy === "tool") {
      return newMessage;
    }
    parent.appendChild(newMessageContainer);
    return newMessage;
  }

  function renderPersistencedHistory() {
    let history = JSON.parse(localStorage.getItem("messages") ?? "");
    if (!history) {
      return;
    }
    for (let message of history) {
      addMessageToDOM(message.content, message.role, chatMessages);
    }
  }

  //Renderizar el historial persistente
  renderPersistencedHistory();
}
