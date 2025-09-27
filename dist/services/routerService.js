export async function loadPage(url) {
    try {
        const res = await fetch(url);
        const html = await res.text();
        // Crear un contenedor temporal para parsear el HTML
        const temp = document.createElement("div");
        temp.innerHTML = html;
        // Extraer y aplicar los estilos <link rel="stylesheet">
        const links = temp.querySelectorAll('link[rel="stylesheet"]');
        links.forEach((link) => {
            const href = link.getAttribute("href");
            if (href && !document.head.querySelector(`link[href="${href}"]`)) {
                document.head.appendChild(link.cloneNode(true));
            }
        });
        // Extraer el <main> de la página cargada
        const newMain = temp.querySelector("main");
        const currentMain = document.getElementById("content"); // O directamente: document.querySelector("main");
        if (newMain && currentMain) {
            currentMain.innerHTML = newMain.innerHTML;
        }
        else {
            console.warn("No se encontró un <main> en la página cargada.");
        }
    }
    catch (error) {
        console.error("Error al cargar la página:", error);
    }
}
