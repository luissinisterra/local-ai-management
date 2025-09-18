var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { sendMessage, addMessageToDOM } from "./main.js";
const textarea = document.getElementById("user-input");
const sendButton = document.getElementById("user-button");
const chatMessages = document.getElementById("chat-messages");
function handleSendMessage() {
  return __awaiter(this, void 0, void 0, function* () {
    const inputValue = textarea.value.trim();
    if (!inputValue) return;
    textarea.value = "";
    addMessageToDOM(inputValue, "user", chatMessages);
    const result = yield sendMessage("gemma3:1b", inputValue);
    addMessageToDOM(result.response, "ai", chatMessages);
  });
}
sendButton.addEventListener("click", handleSendMessage);
textarea.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleSendMessage();
  }
});
