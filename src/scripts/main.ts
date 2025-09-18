export async function sendMessage(model: string, prompt: string) {
  const url = "http://localhost:11434/api/generate";

  try {
    const response = await fetch(url, {
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

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

export function addMessageToDOM(
  content: string,
  sentBy: string,
  parent: HTMLElement,
) {
  const newMessageContent = document.createElement("div");
  const newMessage = document.createElement("p");
  newMessage.textContent = content;
  newMessageContent.appendChild(newMessage);
  if (sentBy === "user") {
    newMessage.className = "user-message";
  } else {
    newMessage.className = "ai-message";
  }
  parent.appendChild(newMessageContent);
}
