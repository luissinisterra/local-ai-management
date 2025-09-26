import { CONFIG } from "../config/config.js";
import type { ApiResponse } from "../config/config.js";

export async function sendMessage(model: string, prompt: string): Promise<ApiResponse | null> {
  // Validar entrada
  if (!prompt.trim()) {
    throw new Error(CONFIG.MESSAGES.EMPTY_MESSAGE);
  }

  if (prompt.length > CONFIG.UI.MAX_MESSAGE_LENGTH) {
    throw new Error(`El mensaje es demasiado largo. Máximo ${CONFIG.UI.MAX_MESSAGE_LENGTH} caracteres.`);
  }

  try {
    // Crear AbortController para timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.API_CONFIG.timeout);

    const response = await fetch(CONFIG.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        prompt: prompt.trim(),
        stream: CONFIG.API_CONFIG.stream,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(CONFIG.MESSAGES.CONNECTION_ERROR);
      }
      throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
    }

    const result: ApiResponse = await response.json();
    
    // Validar estructura de respuesta
    if (!result || typeof result.response !== 'string') {
      throw new Error("Respuesta inválida del servidor");
    }

    console.log("Respuesta recibida:", result);
    return result;
  } catch (error: any) {
    console.error("Error en sendMessage:", error);
    
    if (error.name === 'AbortError') {
      throw new Error("La solicitud tardó demasiado tiempo. Inténtalo de nuevo.");
    }
    
    if (error.message.includes('fetch')) {
      throw new Error(CONFIG.MESSAGES.CONNECTION_ERROR);
    }
    
    throw error;
  }
}

export function addMessageToDOM(
  content: string,
  sentBy: "user" | "ai",
  parent: HTMLElement,
  isLoading: boolean = false
): HTMLElement {
  const newMessageContent = document.createElement("div");
  const newMessage = document.createElement("p");
  
  if (isLoading) {
    newMessage.innerHTML = `<span class="typing-indicator">${content}</span>`;
    newMessage.className = "ai-message loading";
  } else {
    newMessage.textContent = content;
    newMessage.className = sentBy === "user" ? "user-message" : "ai-message";
  }
  
  newMessageContent.appendChild(newMessage);
  parent.appendChild(newMessageContent);
  
  // Scroll automático al final
  parent.scrollTop = parent.scrollHeight;
  
  return newMessageContent;
}

export function updateMessageContent(
  messageElement: HTMLElement,
  newContent: string,
  isLoading: boolean = false
): void {
  const message = messageElement.querySelector("p");
  if (!message) return;
  
  if (isLoading) {
    message.innerHTML = `<span class="typing-indicator">${newContent}</span>`;
    message.className = "ai-message loading";
  } else {
    message.textContent = newContent;
    message.className = "ai-message";
  }
}
