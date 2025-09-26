var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { sendMessage, addMessageToDOM, updateMessageContent } from "./main.js";
import { CONFIG } from "../config/config.js";
// Elementos del DOM
const textarea = document.getElementById("user-input");
const sendButton = document.getElementById("user-button");
const chatMessages = document.getElementById("chat-messages");
// Estado de la aplicación
let isLoading = false;
let currentLoadingMessage = null;
// Función para habilitar/deshabilitar la interfaz
function setLoadingState(loading) {
    isLoading = loading;
    if (loading) {
        sendButton.disabled = true;
        sendButton.style.opacity = "0.6";
        sendButton.style.cursor = "not-allowed";
        textarea.disabled = true;
        textarea.style.opacity = "0.6";
    }
    else {
        sendButton.disabled = false;
        sendButton.style.opacity = "1";
        sendButton.style.cursor = "pointer";
        textarea.disabled = false;
        textarea.style.opacity = "1";
    }
}
// Función para mostrar errores
function showError(message) {
    if (currentLoadingMessage) {
        updateMessageContent(currentLoadingMessage, message, false);
        currentLoadingMessage = null;
    }
    else {
        addMessageToDOM(message, "ai", chatMessages);
    }
    setLoadingState(false);
}
// Función principal para manejar el envío de mensajes
function handleSendMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputValue = textarea.value.trim();
        // Validaciones
        if (!inputValue) {
            showError(CONFIG.MESSAGES.EMPTY_MESSAGE);
            return;
        }
        if (inputValue.length > CONFIG.UI.MAX_MESSAGE_LENGTH) {
            showError(`El mensaje es demasiado largo. Máximo ${CONFIG.UI.MAX_MESSAGE_LENGTH} caracteres.`);
            return;
        }
        if (isLoading) {
            return; // Prevenir múltiples envíos
        }
        // Limpiar input y mostrar mensaje del usuario
        textarea.value = "";
        addMessageToDOM(inputValue, "user", chatMessages);
        // Mostrar indicador de carga
        setLoadingState(true);
        currentLoadingMessage = addMessageToDOM(CONFIG.MESSAGES.LOADING, "ai", chatMessages, true);
        try {
            // Enviar mensaje a la IA
            const result = yield sendMessage(CONFIG.DEFAULT_MODEL, inputValue);
            if (result && result.response) {
                // Actualizar mensaje con la respuesta
                updateMessageContent(currentLoadingMessage, result.response, false);
            }
            else {
                throw new Error("Respuesta vacía del servidor");
            }
        }
        catch (error) {
            console.error("Error en handleSendMessage:", error);
            showError(error.message || CONFIG.MESSAGES.ERROR);
        }
        finally {
            setLoadingState(false);
            currentLoadingMessage = null;
        }
    });
}
// Función para auto-resize del textarea
function autoResizeTextarea() {
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
}
// Event Listeners
sendButton.addEventListener("click", handleSendMessage);
textarea.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSendMessage();
    }
});
// Auto-resize del textarea
textarea.addEventListener("input", autoResizeTextarea);
// Prevenir envío accidental con Ctrl+Enter
textarea.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.ctrlKey) {
        event.preventDefault();
        handleSendMessage();
    }
});
// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    // Enfocar el textarea al cargar
    textarea.focus();
    // Mensaje de bienvenida
    addMessageToDOM("¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?", "ai", chatMessages);
});
