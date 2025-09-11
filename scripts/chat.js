import { sendMessage } from "./main.js"
import { addMessageToDOM } from "./main.js";

const textarea = document.getElementById("user-input");
const sendButton = document.getElementById("user-button");
const chatMessages = document.getElementById("chat-messages")

sendButton.addEventListener("click", async () => {
    const inputValue = textarea.value;
    textarea.value = ""
    addMessageToDOM(inputValue,"user",chatMessages)
    const result = await sendMessage("gemma3:1b", inputValue)
    addMessageToDOM(result.response,"ai",chatMessages)
});

