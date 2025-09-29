var _a;
import loadPage from "../services/router-service.js";
const pageContainer = document.getElementById("page-container");
const toggleButtons = document.querySelectorAll(".toggle-btn");
toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        toggleSidebar();
    });
});
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    if (window.innerWidth <= 768) {
        sidebar === null || sidebar === void 0 ? void 0 : sidebar.classList.toggle("open");
        overlay === null || overlay === void 0 ? void 0 : overlay.classList.toggle("active");
    }
    else {
        sidebar === null || sidebar === void 0 ? void 0 : sidebar.classList.toggle("collapsed");
    }
}
// Close sidebar on mobile when clicking outside
document.addEventListener("click", (e) => {
    const target = e.target;
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.querySelector(".toggle-btn");
    const overlay = document.getElementById("sidebarOverlay");
    if (window.innerWidth <= 768 &&
        !(sidebar === null || sidebar === void 0 ? void 0 : sidebar.contains(target)) &&
        !(toggleBtn === null || toggleBtn === void 0 ? void 0 : toggleBtn.contains(target)) &&
        (sidebar === null || sidebar === void 0 ? void 0 : sidebar.classList.contains("open"))) {
        sidebar.classList.remove("open");
        overlay === null || overlay === void 0 ? void 0 : overlay.classList.remove("active");
    }
});
// Close sidebar when clicking overlay
(_a = document.getElementById("sidebarOverlay")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    sidebar === null || sidebar === void 0 ? void 0 : sidebar.classList.remove("open");
    overlay === null || overlay === void 0 ? void 0 : overlay.classList.remove("active");
});
// Handle window resize
window.addEventListener("resize", () => {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    if (window.innerWidth > 768) {
        sidebar === null || sidebar === void 0 ? void 0 : sidebar.classList.remove("open");
        overlay === null || overlay === void 0 ? void 0 : overlay.classList.remove("active");
    }
    else {
        sidebar === null || sidebar === void 0 ? void 0 : sidebar.classList.remove("collapsed");
    }
});
// Tab functionality
document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", (e) => {
        e.preventDefault();
        document
            .querySelectorAll(".tab")
            .forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
    });
});
// Navigation functionality
document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        const route = target.getAttribute("href");
        if (!route)
            return;
        document
            .querySelectorAll(".nav-item")
            .forEach((t) => t.classList.remove("active"));
        target.classList.add("active");
        loadPage(pageContainer, route);
        // Close sidebar on mobile after navigation
        if (window.innerWidth <= 768) {
            const sidebar = document.getElementById("sidebar");
            const overlay = document.getElementById("sidebarOverlay");
            sidebar === null || sidebar === void 0 ? void 0 : sidebar.classList.remove("open");
            overlay === null || overlay === void 0 ? void 0 : overlay.classList.remove("active");
        }
    });
});
// Button animations
document.querySelectorAll(".create-btn, .page-number").forEach((btn) => {
    btn.addEventListener("click", () => {
        const el = btn;
        el.style.transform = "scale(0.95)";
        setTimeout(() => {
            el.style.transform = "";
        }, 100);
    });
});
