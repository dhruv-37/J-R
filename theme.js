(() => {
  const storageKey = "valmeth-theme";
  const root = document.documentElement;
  let savedTheme = null;

  try {
    const storedTheme = localStorage.getItem(storageKey);
    if (storedTheme === "light" || storedTheme === "dark") {
      savedTheme = storedTheme;
    }
  } catch {}

  root.dataset.theme = savedTheme || "light";

  const updateButtons = () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
      button.setAttribute("aria-pressed", String(root.dataset.theme === "dark"));
      button.title = `Switch to ${nextTheme} mode`;
    });
  };

  document.addEventListener("click", (event) => {
    const target = event.target;
    const button = target instanceof Element ? target.closest("[data-theme-toggle]") : null;
    if (!button) return;

    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(storageKey, root.dataset.theme);
    } catch {}
    updateButtons();
  });

  document.addEventListener("DOMContentLoaded", updateButtons, { once: true });
})();