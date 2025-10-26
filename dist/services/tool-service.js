export function getWeatherTool() {
    return [
        {
            type: "function",
            function: {
                name: "get_current_weather",
                description: "Get the current weather for a city",
                parameters: {
                    type: "object",
                    properties: {
                        city: {
                            type: "string",
                            description: "The name of the city",
                        },
                    },
                    required: ["city"],
                },
            },
        },
    ];
}
//Podría llamar a una API
async function get_current_weather(city) {
    const response = await fetch(`https://www.meteosource.com/api/v1/free/point?place_id=${city}&sections=current%2Chourly&language=en&units=auto&key=axl8monwluu969z0usp7147qm0lwg7h8l1gsi88s`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
}
export async function runModelWithWeatherTool(name, messages, city) {
    const tools = await get_current_weather(city);
    const url = "http://localhost:11434/api/chat";
    messages.push({
        role: "tool",
        name: "get_current_weather",
        content: JSON.stringify(tools),
    });
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: name,
            messages: messages,
            stream: false,
        }),
    });
    const data = await response.json();
    console.log("Mensajes tras tool:", JSON.stringify(messages));
    console.log("Respuesta de Ollama tras tool:", response.status, response.ok);
    console.log("Cuerpo: " + JSON.stringify(data));
}
