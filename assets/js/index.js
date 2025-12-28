var sections = document.querySelectorAll("section");
var links = document.querySelectorAll(".nav-link");
var themeBtn = document.getElementById("theme-toggle-button");
var filterButtons = document.querySelectorAll(".portfolio-filter");
var portfolioItems = document.querySelectorAll(".portfolio-item");
var cards = document.querySelectorAll(".testimonial-card");
var indicators = document.querySelectorAll(".carousel-indicator");
var nextBtn = document.getElementById("next-testimonial");
var prevBtn = document.getElementById("prev-testimonial");
var cardsPerView = 3;
var currentIndex = 0;
var maxIndex = cards.length - cardsPerView;
var scrollBtn = document.getElementById("scroll-to-top");
var toggleBtn = document.getElementById("settings-toggle");
var sidebar = document.getElementById("settings-sidebar");
var closeBtn = document.getElementById("close-settings");
var fontButtons = document.querySelectorAll(".font-option");
var savedFont = localStorage.getItem("selectedFont");
var colorsGrid = document.getElementById("theme-colors-grid");
var themeColors = [
  { name: "green", color: "#22c55e" },
  { name: "blue", color: "#38bdf8" },
  { name: "orange", color: "#f97316" },
  { name: "purple", color: "#8b5cf6" },
  { name: "red", color: "#ef4444" },
  { name: "sky", color: "#0ea5e9" },
];
var savedColor = localStorage.getItem("primaryColor");

//1-Navbar
window.addEventListener("scroll", () => {
  var currentSection = "";
  switch (currentSection) {
    case "hero-section":
      document.querySelector('a[href="#hero-section"]').classList.add("active");
      break;
    case "about":
      document.querySelector('a[href="#about"]').classList.add("active");
      break;
    case "skills-section":
      document
        .querySelector('a[href="#skills-section"]')
        .classList.add("active");
      break;
    case "portfolio":
      document.querySelector('a[href="#portfolio"]').classList.add("active");
      break;
    case "experience":
      document.querySelector('a[href="#experience"]').classList.add("active");
      break;
    case "testimonials":
      document.querySelector('a[href="#testimonials"]').classList.add("active");
      break;
    case "statistics-section":
      document
        .querySelector('a[href="#statistics-section"]')
        .classList.add("active");
      break;
    case "contact":
      document.querySelector('a[href="#contact"]').classList.add("active");
      break;
  }
});
//2-Dark and Light Theme Switch functionality
themeBtn.addEventListener("click", () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    themeBtn.setAttribute("aria-pressed", "false");
  } else {
    document.documentElement.classList.add("dark");
    themeBtn.setAttribute("aria-pressed", "true");
  }
});
//3-Portfolio
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove(
        "active",
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white"
      );
      btn.classList.add(
        "bg-white",
        "dark:bg-slate-800",
        "text-slate-600",
        "dark:text-slate-300",
        "border",
        "border-slate-300",
        "dark:border-slate-700"
      );
      btn.setAttribute("aria-pressed", "false");
    });
    button.classList.remove(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "border",
      "border-slate-300",
      "dark:border-slate-700"
    );
    button.classList.add(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white"
    );
    button.setAttribute("aria-pressed", "true");
    var filter = button.dataset.filter;
    portfolioItems.forEach((item) => {
      item.classList.add("hidden");
      switch (filter) {
        case "all":
          item.classList.remove("hidden");
          break;
        case "web":
          if (item.dataset.category === "web") {
            item.classList.remove("hidden");
          }
          break;
        case "app":
          if (item.dataset.category === "app") {
            item.classList.remove("hidden");
          }
          break;
        case "design":
          if (item.dataset.category === "design") {
            item.classList.remove("hidden");
          }
          break;
        case "ecommerce":
          if (item.dataset.category === "ecommerce") {
            item.classList.remove("hidden");
          }
          break;
      }
    });
  });
});
//4-Testmonials
updateIndicators(currentIndex);
function showTestimonials() {
  cards.forEach((card) => card.classList.add("hidden"));
  for (var i = currentIndex; i < currentIndex + cardsPerView; i++) {
    if (cards[i]) {
      cards[i].classList.remove("hidden");
    }
  }
}
function updateIndicators(activeIndex) {
  indicators.forEach((dot) => {
    dot.classList.remove("bg-accent");
    dot.classList.add("bg-slate-400");
    indicators[activeIndex].classList.add("dark:bg-slate-600");
    dot.setAttribute("aria-selected", "false");
  });
  if (indicators[activeIndex]) {
    indicators[activeIndex].classList.remove("bg-slate-400");
    indicators[activeIndex].classList.remove("dark:bg-slate-600");
    indicators[activeIndex].classList.add("bg-accent");
    indicators[activeIndex].setAttribute("aria-selected", "true");
  }
}
nextBtn.addEventListener("click", () => {
  if (currentIndex < maxIndex) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  showTestimonials();
  updateIndicators(currentIndex);
});
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = maxIndex;
  }
  showTestimonials();
  updateIndicators(currentIndex);
});
indicators.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    showTestimonials();
    updateIndicators(currentIndex);
  });
});
//5-Customize template
function openSidebar() {
  sidebar.classList.remove("translate-x-full");
  toggleBtn.setAttribute("aria-expanded", "true");
  sidebar.setAttribute("aria-hidden", "false");
}
function closeSidebar() {
  sidebar.classList.add("translate-x-full");
  toggleBtn.setAttribute("aria-expanded", "false");
  sidebar.setAttribute("aria-hidden", "true");
}
toggleBtn.addEventListener("click", openSidebar);
closeBtn.addEventListener("click", closeSidebar);
// !Fonts
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
if (savedFont) {
  document.body.classList.add(`font-${savedFont}`);
  fontButtons.forEach((btn) => {
    if (btn.dataset.font === savedFont) {
      btn.classList.add("active");
      btn.setAttribute("aria-checked", "true");
    }
  });
}
//!Colors
function getPrimaryElements() {
  return {
    text: document.querySelectorAll(".text-primary"),
    bg: document.querySelectorAll(".bg-primary"),
    border: document.querySelectorAll(".border-primary"),
  };
}
function applyPrimary(color) {
  var els = getPrimaryElements();
  els.text.forEach(el => {
    el.style.color = color;
  });
  els.bg.forEach(el => {
    el.style.backgroundColor = color;
  });
  els.border.forEach(el => {
    el.style.borderColor = color;
  });
}
function switchPrimary(colorName) {
  var color = "";

  switch (colorName) {
    case "green":
      color = "#22c55e";
      break;
    case "blue":
      color = "#38bdf8";
      break;
    case "orange":
      color = "#f97316";
      break;
    case "purple":
      color = "#8b5cf6";
      break;
    case "red":
      color = "#ef4444";
      break;
    case "sky":
      color = "#0ea5e9";
      break;
  }
  applyPrimary(color);
  localStorage.setItem("primaryColor", colorName);
}

themeColors.forEach(c => {
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className =
    "w-10 h-10 rounded-full border-2 border-white shadow hover:scale-110 transition-transform";
  btn.style.backgroundColor = c.color;

  btn.addEventListener("click", () => {
    switchPrimary(c.name);
  });
  colorsGrid.appendChild(btn);
});

// استرجاع اللون
const savedColor = localStorage.getItem("primaryColor");
if (savedColor) {
  switchPrimary(savedColor);
}

//6- scroll to top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.remove("opacity-0", "invisible");
    scrollBtn.classList.add("opacity-100", "visible");
  } else {
    scrollBtn.classList.add("opacity-0", "invisible");
    scrollBtn.classList.remove("opacity-100", "visible");
  }
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
