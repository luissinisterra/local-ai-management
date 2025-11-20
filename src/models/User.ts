// Usuario simple
export class User {
  username: string;
  email: string;
  defaultModel: string;

  constructor(username: string, email: string) {
    this.username = username;
    this.email = email;
    this.defaultModel = 'gemma3:4b';
  }

  // Cambiar modelo por defecto
  setDefaultModel(modelName: string): void {
    this.defaultModel = modelName;
  }

  // Obtener información del usuario
  getInfo(): { username: string; email: string; defaultModel: string } {
    return {
      username: this.username,
      email: this.email,
      defaultModel: this.defaultModel
    };
  }
}
