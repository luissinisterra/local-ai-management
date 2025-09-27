export default function loadPage(container: HTMLElement | null, page: string) {
  if (!container) return;

  if (page === "/home") {
    container.innerHTML = "";
    const page = document.createElement("home-page");
    container.appendChild(page);
  } else if (page === "/models") {
    container.innerHTML = "";
    const page = document.createElement("models-management-page");
    container.appendChild(page);
  } else if (page === "/chat") {
    container.innerHTML = "";
    const page = document.createElement("chat-page");
    container.appendChild(page);
  }
}
