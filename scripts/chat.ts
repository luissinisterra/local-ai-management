import { sendMessage } from "./main.js";
import { addMessageToDOM } from "./main.js";

const textarea = document.getElementById("user-input") as HTMLTextAreaElement;
const sendButton = document.getElementById("user-button") as HTMLElement;
const chatMessages = document.getElementById("chat-messages") as HTMLElement;

async function handleSendMessage() {
  const inputValue: string = textarea.value.trim();
  if (!inputValue) return;

  textarea.value = "";
  addMessageToDOM(inputValue, "user", chatMessages);

  const result = await sendMessage("gemma3:1b", inputValue);
  addMessageToDOM(result.response, "ai", chatMessages);
}

sendButton.addEventListener("click", handleSendMessage);

textarea.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleSendMessage();
  }
});
