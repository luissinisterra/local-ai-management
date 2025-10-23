import type { Message } from "./interfaces/message.js";

// Modelo simple para representar un modelo de IA
export class Model {
  name: string;
  size: number;

  constructor(name: string, size: number = 0) {
    this.name = name;
    this.size = size;
  }

  // Enviar mensaje con streaming
  async *streamMessage(
    messages: Message[],
    toolsJson: Object[],
  ): AsyncGenerator<string> {
    console.log("Modelo enviando mensaje a Ollama:", this.name);
    const url = "http://localhost:11434/api/chat";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.name,
          messages: messages,
          stream: true,
          tools: toolsJson,
        }),
      });

      console.log("Respuesta de Ollama:", response.status, response.ok);

      if (!response.ok) {
        throw new Error(
          `Error de Ollama: ${response.status} ${response.statusText}`,
        );
      }

      const reader = response.body?.getReader();
      if (!reader) {
        console.error("No se pudo obtener el reader del stream");
        return;
      }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const json = JSON.parse(line);
            console.log(json.message + " -->JSON recibido:", json);

            if (json.message?.content) {
              console.log("Enviando chunk:", json.message.content);
              yield json.message.content;
            } else if (json.message.tool_calls) {
              //Aca se hace todo lo que se necesite de tools
              return "";
              alert(
                JSON.stringify(
                  json.message.tool_calls[0].function.arguments.city,
                ),
              );
            }
          } catch (err) {
            console.error("Error parseando JSON:", line, err);
          }
        }
      }
    } catch (error) {
      console.error("Error en streamMessage:", error);
      throw error;
    }
  }

  // Obtener todos los modelos disponibles
  static async getModels(): Promise<Model[]> {
    try {
      const response = await fetch("http://localhost:11434/api/tags");
      const data = await response.json();

      return (
        data.models?.map((model: any) => new Model(model.name, model.size)) ||
        []
      );
    } catch (error) {
      console.error("Error loading models:", error);
      return [];
    }
  }

  getName(): string {
    return this.name;
  }
}
