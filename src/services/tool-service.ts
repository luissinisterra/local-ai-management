export function getActiveTools(): Object[] {
  let activeTools = [];

  if (JSON.parse(localStorage.getItem("isWeatherToolActive") ?? "false")) {
    activeTools.push(getWeatherTool());
  }
  return activeTools;
}

function getWeatherTool(): Object {
  return {
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
  };
}

//Podría llamar a una API
export async function get_current_weather(
  city: string,
): Promise<string | Object> {
  alert("buscando clima");

  const response = await fetch(
    `https://www.meteosource.com/api/v1/free/point?place_id=${city}&sections=current%2Chourly&language=en&units=auto&key=axl8monwluu969z0usp7147qm0lwg7h8l1gsi88s`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  console.log("RESPUESTA API:" + JSON.stringify(data));

  const weatherBody = {
    current: data.current,
    date: data.hourly.data[0].date,
  };
  return weatherBody;
}
