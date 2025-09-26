import { chat } from "./main.js";
const textarea = document.getElementById("user-input");
const sendButton = document.getElementById("user-button");
const chatMessages = document.getElementById("chat-messages");
const history = [];
async function handleSendMessage() {
    console.log("boton pre");
    const inputValue = textarea.value.trim();
    if (!inputValue)
        return;
    textarea.value = "";
    addMessageToDOM(inputValue, "user", chatMessages);
    history.push({
        role: "user",
        content: inputValue,
    });
    let currentAiMessage = addMessageToDOM("", "ai", chatMessages);
    for await (const chunk of chat("gemma3:4b", history)) {
        currentAiMessage.textContent += chunk;
    }
    history.push({
        role: "ai",
        content: currentAiMessage + "",
    });
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
