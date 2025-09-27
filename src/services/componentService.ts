export default async function chargeComponent(
  shadow: ShadowRoot | null,
  htmlUrl: string,
  cssUrl: string,
): Promise<void> {
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
  shadow?.appendChild(style);
  shadow?.appendChild(template.content);
}
