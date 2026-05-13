(function () {
  "use strict";

  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // Persona tabs
  var tabs = document.querySelectorAll(".persona-tab");
  var panels = document.querySelectorAll(".persona-panel");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var target = tab.getAttribute("data-persona");
      tabs.forEach(function (t) { t.classList.remove("active"); });
      panels.forEach(function (p) { p.classList.remove("active"); });
      tab.classList.add("active");
      var panel = document.getElementById("panel-" + target);
      if (panel) panel.classList.add("active");
    });
  });

  // Theme toggle
  var THEME_KEY = "roazr-theme";
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    function syncThemeToggleUi() {
      var isLight = root.getAttribute("data-theme") === "light";
      themeBtn.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
      );
      themeBtn.setAttribute("title", isLight ? "Theme: light" : "Theme: dark");
    }
    syncThemeToggleUi();
    themeBtn.addEventListener("click", function () {
      var isLight = root.getAttribute("data-theme") === "light";
      if (isLight) {
        root.removeAttribute("data-theme");
        try {
          localStorage.removeItem(THEME_KEY);
        } catch (e) {}
      } else {
        root.setAttribute("data-theme", "light");
        try {
          localStorage.setItem(THEME_KEY, "light");
        } catch (e) {}
      }
      syncThemeToggleUi();
    });
  }

  // Waitlist form
  var form = document.getElementById("waitlist-form");
  var thankYou = document.getElementById("waitlist-thank-you");
  if (form && thankYou) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = form.querySelector('input[type="email"]');
      if (email && email.value.trim()) {
        form.style.display = "none";
        thankYou.classList.add("show");
        thankYou.setAttribute("role", "status");
      }
    });
  }
})();
