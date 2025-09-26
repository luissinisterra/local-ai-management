// Configuración de la aplicación
export const CONFIG = {
    // URL del servidor de IA local (Ollama)
    API_URL: "http://localhost:11434/api/generate",
    // Modelo de IA por defecto
    DEFAULT_MODEL: "gemma3:1b",
    // Configuración de la API
    API_CONFIG: {
        stream: false,
        timeout: 30000, // 30 segundos
    },
    // Mensajes del sistema
    MESSAGES: {
        LOADING: "Escribiendo...",
        ERROR: "Lo siento, hubo un error. Inténtalo de nuevo.",
        CONNECTION_ERROR: "No se pudo conectar con el servidor. Verifica que Ollama esté ejecutándose.",
        EMPTY_MESSAGE: "Por favor, escribe un mensaje antes de enviar.",
    },
    // Configuración de la UI
    UI: {
        MAX_MESSAGE_LENGTH: 1000,
        TYPING_INDICATOR_DELAY: 500, // ms
    }
};
