export default async function chargeComponent(shadow, htmlUrl, cssUrl) {
    // Cargar HTML y CSS desde archivos externos
    const [htmlContent, cssContent] = await Promise.all([
        fetch(htmlUrl).then((res) => res.text()),
        fetch(cssUrl).then((res) => res.text()),
    ]);
    // Crear template con HTML
    const template = document.createElement("template");
    template.innerHTML = htmlContent;
    // Crear elemento <style> con CSS
    const style = document.createElement("style");
    style.textContent = cssContent;
    // Agregar todo al Shadow DOM
    shadow === null || shadow === void 0 ? void 0 : shadow.appendChild(style);
    shadow === null || shadow === void 0 ? void 0 : shadow.appendChild(template.content);
}
