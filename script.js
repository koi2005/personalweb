document.documentElement.classList.add("animations-ready");

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const navigationLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];

const revealFallback = window.setTimeout(() => {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}, 1800);

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "打开导航");
  navigation.classList.remove("open");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "打开导航" : "关闭导航");
  navigation.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

window.addEventListener("load", () => {
  window.setTimeout(() => window.clearTimeout(revealFallback), 2200);
});

const sections = [...document.querySelectorAll("main section[id]")];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navigationLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55%", threshold: 0 },
);

sections.forEach((section) => sectionObserver.observe(section));

const dailyNotes = [
  "今天也要做一点真实的小事。",
  "先完成，再慢慢变得漂亮。",
  "好奇心会把普通的一天撑开。",
  "让 AI 加速，让判断留在自己手里。",
  "新的想法，值得一个可以运行的版本。",
];
const sealButton = document.querySelector(".seal-button");
const dailyNote = document.querySelector("#daily-note");
let noteIndex = 0;

sealButton.addEventListener("click", () => {
  noteIndex = (noteIndex + 1) % dailyNotes.length;
  dailyNote.classList.add("changing");
  window.setTimeout(() => {
    dailyNote.textContent = dailyNotes[noteIndex];
    dailyNote.classList.remove("changing");
  }, 150);
});

document.querySelector("#year").textContent = new Date().getFullYear();
