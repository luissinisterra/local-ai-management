import loadPage from "../services/router-service.js";

//localStorage.clear();

const pageContainer = document.getElementById(
  "page-container",
) as HTMLElement | null;

const toggleButtons =
  document.querySelectorAll<HTMLButtonElement>(".toggle-btn");

toggleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleSidebar();
  });
});

function toggleSidebar(): void {
  const sidebar = document.getElementById("sidebar") as HTMLElement | null;
  const overlay = document.getElementById(
    "sidebarOverlay",
  ) as HTMLElement | null;

  if (window.innerWidth <= 768) {
    sidebar?.classList.toggle("open");
    overlay?.classList.toggle("active");
  } else {
    sidebar?.classList.toggle("collapsed");
  }
}

// Close sidebar on mobile when clicking outside
document.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const sidebar = document.getElementById("sidebar") as HTMLElement | null;
  const toggleBtn = document.querySelector(".toggle-btn") as HTMLElement | null;
  const overlay = document.getElementById(
    "sidebarOverlay",
  ) as HTMLElement | null;

  if (
    window.innerWidth <= 768 &&
    !sidebar?.contains(target) &&
    !toggleBtn?.contains(target) &&
    sidebar?.classList.contains("open")
  ) {
    sidebar.classList.remove("open");
    overlay?.classList.remove("active");
  }
});

// Close sidebar when clicking overlay
document.getElementById("sidebarOverlay")?.addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar") as HTMLElement | null;
  const overlay = document.getElementById(
    "sidebarOverlay",
  ) as HTMLElement | null;
  sidebar?.classList.remove("open");
  overlay?.classList.remove("active");
});

// Handle window resize
window.addEventListener("resize", () => {
  const sidebar = document.getElementById("sidebar") as HTMLElement | null;
  const overlay = document.getElementById(
    "sidebarOverlay",
  ) as HTMLElement | null;

  if (window.innerWidth > 768) {
    sidebar?.classList.remove("open");
    overlay?.classList.remove("active");
  } else {
    sidebar?.classList.remove("collapsed");
  }
});

// Tab functionality
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", (e: Event) => {
    e.preventDefault();

    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("active"));

    tab.classList.add("active");
  });
});

// Navigation functionality
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", (e: Event) => {
    e.preventDefault();

    const target = e.currentTarget as HTMLElement;
    const route = target.getAttribute("href");

    if (!route) return;

    document
      .querySelectorAll(".nav-item")
      .forEach((t) => t.classList.remove("active"));

    target.classList.add("active");

    loadPage(pageContainer, route);

    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
      const sidebar = document.getElementById("sidebar") as HTMLElement | null;
      const overlay = document.getElementById(
        "sidebarOverlay",
      ) as HTMLElement | null;
      sidebar?.classList.remove("open");
      overlay?.classList.remove("active");
    }
  });
});

// Button animations
document.querySelectorAll(".create-btn, .page-number").forEach((btn) => {
  btn.addEventListener("click", () => {
    const el = btn as HTMLElement;
    el.style.transform = "scale(0.95)";
    setTimeout(() => {
      el.style.transform = "";
    }, 100);
  });
});
