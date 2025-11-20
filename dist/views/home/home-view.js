import chargeComponent from "../../services/view-service.js";
import init from "../../controllers/home-controller.js";
class HomeView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }); // Shadow DOM inicial
    }
    async connectedCallback() {
        await chargeComponent(this.shadowRoot, "./src/views/home/home-view.html", "./src/views/home/home-view.css");
        init(this.shadowRoot);
    }
}
// Registrar componente
customElements.define("home-view", HomeView);
