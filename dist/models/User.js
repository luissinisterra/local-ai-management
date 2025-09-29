// Usuario simple
export class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
        this.defaultModel = 'gemma3:4b';
    }
    // Cambiar modelo por defecto
    setDefaultModel(modelName) {
        this.defaultModel = modelName;
    }
    // Obtener información del usuario
    getInfo() {
        return {
            username: this.username,
            email: this.email,
            defaultModel: this.defaultModel
        };
    }
}
