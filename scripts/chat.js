import { sendMessage } from "./main.js"
import { addMessageToDOM } from "./main.js";

const textarea = document.getElementById("user-input");
const sendButton = document.getElementById("user-button");
const chatMessages = document.getElementById("chat-messages")

async function handleSendMessage() {
  const inputValue = textarea.value.trim();
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