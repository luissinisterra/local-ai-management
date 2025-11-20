import chargeComponent from "../../services/view-service.js";
import init from "../../controllers/models-management-controller.js";

class ModelsManagementView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // Shadow DOM inicial
  }

  async connectedCallback() {
    await chargeComponent(
      this.shadowRoot,
      "./src/views/models-management/models-management-view.html",
      "./src/views/models-management/models-management-view.css"
    );
    init(this.shadowRoot);
  }
}

// Registrar componente
customElements.define("models-management-view", ModelsManagementView);