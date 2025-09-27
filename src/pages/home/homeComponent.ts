import chargeComponent from "../../services/componentService.js";
import init from "./homeController.js";

class HomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // Shadow DOM inicial
  }

  async connectedCallback() {
    await chargeComponent(
      this.shadowRoot,
      "./src/pages/home/homeTemplate.html",
      "./src/pages/home/homeStyles.css",
    );
    init(this.shadowRoot);
  }
}

// Registrar componente
customElements.define("home-page", HomePage);
