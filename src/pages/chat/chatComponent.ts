import chargeComponent from "../../services/componentService.js";
import init from "./chatController.js";

class Chat extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // Shadow DOM inicial
  }

  async connectedCallback() {
    await chargeComponent(
      this.shadowRoot,
      "./src/pages/chat/chatTemplate.html",
      "./src/pages/chat/chatStyles.css",
    );
    init(this.shadowRoot);
  }
}

// Registrar componente
customElements.define("chat-page", Chat);
