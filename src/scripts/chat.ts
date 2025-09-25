import { chat, addMessageToDOM } from "./main.js";
import type { Message } from "../interfaces/Message.js";

const textarea = document.getElementById("user-input") as HTMLTextAreaElement;
const sendButton = document.getElementById("user-button") as HTMLElement;
const chatMessages = document.getElementById("chat-messages") as HTMLElement;

const history: Message[] = [];

async function handleSendMessage() {
  console.log("boton pre");
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
