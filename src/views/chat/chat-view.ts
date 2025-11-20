import chargeComponent from "../../services/view-service.js";
import init from "../../controllers/chat-controller.js";

class ChatView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // Shadow DOM inicial
  }

  async connectedCallback() {
    await chargeComponent(
      this.shadowRoot,
      "./src/views/chat/chat-view.html",
      "./src/views/chat/chat-view.css"
    );
    init(this.shadowRoot);
  }
}

// Registrar componente
customElements.define("chat-view", ChatView);