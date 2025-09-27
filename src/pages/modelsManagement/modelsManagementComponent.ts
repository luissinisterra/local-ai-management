import chargeComponent from "../../services/componentService.js";
import init from "./modelsManagementController.js";

class modelsManagementPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // Shadow DOM inicial
  }

  async connectedCallback() {
    await chargeComponent(
      this.shadowRoot,
      "./src/pages/modelsManagement/modelsManagementTemplate.html",
      "./src/pages/modelsManagement/modelsManagementStyles.css",
    );
    init(this.shadowRoot);
  }
}

// Registrar componente
customElements.define("models-management-page", modelsManagementPage);
