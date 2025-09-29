import type { Message } from "../models/interfaces/message";

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

export async function* chat(
  model: string,
  history: Message[],
): AsyncGenerator<string> {
  const url = "http://localhost:11434/api/chat";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: history,
        stream: true,
      }),
    });

    const reader = res.body?.getReader();
    if (reader === undefined) return;
    const decoder = new TextDecoder();
    let buffer: string | undefined = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Separar por líneas (cada línea es un JSON)
      const lines: any = buffer?.split("\n");
      buffer = lines.pop(); // Guarda la última línea incompleta

      for (const line of lines) {
        if (!line.trim()) continue;

        try {
          const json = JSON.parse(line);
          const content = json.message?.content;

          if (content) {
            console.log("ahh " + content);
            yield content; // solo el fragmento de texto
          }
        } catch (err) {
          console.error("Error parseando JSON de la línea:", line);
        }
      }
    }
  } catch (error: any) {
    console.error("Error en chat():", error.message);
  }
}
