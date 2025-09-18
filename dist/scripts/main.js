var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function sendMessage(model, prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "http://localhost:11434/api/generate";
        try {
            const response = yield fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: model,
                    prompt: prompt,
                    stream: false,
                }),
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = yield response.json();
            console.log(result);
            return result;
        }
        catch (error) {
            console.error("Error:", error.message);
        }
    });
}
export function addMessageToDOM(content, sentBy, parent) {
    const newMessageContent = document.createElement("div");
    const newMessage = document.createElement("p");
    newMessage.textContent = content;
    newMessageContent.appendChild(newMessage);
    if (sentBy === "user") {
        newMessage.className = "user-message";
    }
    else {
        newMessage.className = "ai-message";
    }
    parent.appendChild(newMessageContent);
}
