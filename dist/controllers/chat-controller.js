import { ChatService } from "../services/chat-service.js";
export default function init(shadow) {
    if (!shadow)
        return;
    const textarea = shadow.getElementById("user-input");
    const sendButton = shadow.getElementById("user-button");
    const chatMessages = shadow.getElementById("chat-messages");
    // Crear servicio de chat y sesión
    const chatService = new ChatService();
    chatService.createSession("gemma2:2b");
    async function handleSendMessage() {
        const inputValue = textarea.value.trim();
        if (!inputValue)
            return;
        console.log('Enviando mensaje:', inputValue);
        textarea.value = "";
        addMessageToDOM(inputValue, "user", chatMessages);
        let currentAiMessage = null;
        try {
            console.log('Iniciando streaming...');
            // Enviar mensaje con streaming
            for await (const chunk of chatService.streamMessage(inputValue)) {
                console.log('Recibido chunk:', chunk);
                if (!currentAiMessage) {
                    currentAiMessage = addMessageToDOM("", "ai", chatMessages);
                }
                currentAiMessage.textContent += chunk;
            }
            console.log('Streaming completado');
        }
        catch (error) {
            console.error('Error sending message:', error);
            if (!currentAiMessage) {
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                currentAiMessage = addMessageToDOM("Error al enviar mensaje: " + errorMessage, "ai", chatMessages);
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
    function addMessageToDOM(content, sentBy, parent) {
        const newMessageContainer = document.createElement("div");
        const newMessage = document.createElement("p");
        newMessage.textContent = content;
        newMessageContainer.appendChild(newMessage);
        if (sentBy === "user") {
            newMessage.className = "user-message";
        }
        else {
            newMessage.className = "ai-message";
        }
        parent.appendChild(newMessageContainer);
        return newMessage;
    }
}
