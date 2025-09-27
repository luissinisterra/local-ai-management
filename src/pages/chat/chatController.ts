import { chat } from "../../services/ollamaService.js";
import type { Message } from "models/interfaces/Message";

export default function init(shadow: ShadowRoot | null) {
  if (!shadow) return;
  const textarea = shadow.getElementById("user-input") as HTMLTextAreaElement;
  const sendButton = shadow.getElementById("user-button") as HTMLElement;
  const chatMessages = shadow.getElementById("chat-messages") as HTMLElement;

  const history: Message[] = [];

  async function handleSendMessage() {
    const inputValue: string = textarea.value.trim();
    if (!inputValue) return;

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
    } else {
      newMessage.className = "ai-message";
    }
    parent.appendChild(newMessageContainer);
    return newMessage;
  }
}
