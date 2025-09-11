async function sendMessage(model, prompt) {
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
  } catch (error) {
    console.error("Error:", error.message);
    console.log("FALLO BRO");
  }
}

sendMessage("gemma3:4b", "Saluda a Luis");