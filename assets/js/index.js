var sections = document.querySelectorAll("section");
var links = document.querySelectorAll(".nav-link");
var themeBtn = document.getElementById("theme-toggle-button");
var scrollBtn = document.getElementById("scroll-to-top");

var toggleBtn = document.getElementById("settings-toggle");
var sidebar = document.getElementById("settings-sidebar");
var closeBtn = document.getElementById("close-settings");

var fontButtons = document.querySelectorAll(".font-option");
var savedFont = localStorage.getItem("selectedFont");

var colorsGrid = document.getElementById("theme-colors-grid");
var savedColor = localStorage.getItem("primaryColor");

var themeColors = [
  { name: "green", color: "#22c55e" },
  { name: "blue", color: "#38bdf8" },
  { name: "orange", color: "#f97316" },
  { name: "purple", color: "#8b5cf6" },
  { name: "red", color: "#ef4444" },
  { name: "sky", color: "#0ea5e9" },
];

//!NayBar
window.addEventListener("scroll", () => {
  var current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  links.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

//!Dark-light-Mode
themeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  themeBtn.setAttribute(
    "aria-pressed",
    document.documentElement.classList.contains("dark")
  );
});

//!Geer-Btn
toggleBtn.addEventListener("click", () => {
  sidebar.classList.remove("translate-x-full");
});
closeBtn.addEventListener("click", () => {
  sidebar.classList.add("translate-x-full");
});

//!Fonts
fontButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    fontButtons.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-checked", "false");
    });

    btn.classList.add("active");
    btn.setAttribute("aria-checked", "true");

    var font = btn.dataset.font;
    document.body.classList.remove(
      "font-alexandria",
      "font-tajawal",
      "font-cairo"
    );
    document.body.classList.add(`font-${font}`);

    localStorage.setItem("selectedFont", font);
  });
});

// !Restore Font
if (savedFont) {
  document.body.classList.add(`font-${savedFont}`);
  fontButtons.forEach((btn) => {
    if (btn.dataset.font === savedFont) {
      btn.classList.add("active");
      btn.setAttribute("aria-checked", "true");
    }
  });
}

//!Color
function getPrimaryElements() {
  return {
    text: document.querySelectorAll(".text-primary"),
    bg: document.querySelectorAll(".bg-primary"),
    border: document.querySelectorAll(".border-primary"),
    buttons: document.querySelectorAll(".btn-primary"),
    nav: document.querySelectorAll(".nav-primary"),
    // span: document.querySelectorAll("span"),
    gradients: document.querySelectorAll(
      "[class*='from-'], [class*='to-'], .bg-linear-to-r"
    ),
  };
}
function removePrimaryClasses(el) {
  [...el.classList].forEach(cls => {
    if (
      cls.includes("primary") ||
      cls.includes("from-") ||
      cls.includes("to-") ||
      cls.includes("bg-linear")
    ) {
      el.classList.remove(cls);
    }
  });
  el.style.removeProperty("--tw-gradient-from");
  el.style.removeProperty("--tw-gradient-to");
}
function applyPrimary(color) {
  const els = getPrimaryElements();

  els.text.forEach(el => {
    removePrimaryClasses(el);
    el.style.color = color;
  });

  els.span.forEach(el => {
    removePrimaryClasses(el);
    el.style.color = color;
  });

  els.bg.forEach(el => {
    removePrimaryClasses(el);
    el.style.backgroundColor = color;
  });

  els.border.forEach(el => {
    removePrimaryClasses(el);
    el.style.borderColor = color;
  });

  els.buttons.forEach(el => {
    removePrimaryClasses(el);
    el.style.backgroundColor = color;
    el.style.borderColor = color;
    el.style.color = "#fff";
  });
  els.nav.forEach(el => {
    el.style.color = color;
    el.style.borderBottom = `2px solid ${color}`;
  });
}
function switchPrimary(name) {
  const color = themeColors.find(c => c.name === name)?.color;
  if (!color) return;

  applyPrimary(color); 
  localStorage.setItem("primaryColor", name);
}
themeColors.forEach(c => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className =
    "w-10 h-10 rounded-full border-2 border-white shadow hover:scale-110 transition-transform";
  btn.style.backgroundColor = c.color;

  btn.addEventListener("click", () => {
    switchPrimary(c.name);
  });

  colorsGrid.appendChild(btn);
});
// !Restore Color
if (savedColor) {
  switchPrimary(savedColor);
}

//!Scroll-To-Top
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.remove("opacity-0", "invisible");
  } else {
    scrollBtn.classList.add("opacity-0", "invisible");
  }
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
