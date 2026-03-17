const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuButton && siteNav) {
  const closeMenu = () => {
    menuButton.classList.remove("is-open");
    siteNav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.classList.toggle("is-open");
    siteNav.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 860) {
        closeMenu();
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeMenu();
    }
  });
}

const normalizedPath = window.location.pathname.replace(/\/+$/, "");
const currentPage = (() => {
  const lastSegment = normalizedPath.split("/").pop() || "index.html";
  if (!lastSegment || lastSegment === "") {
    return "index.html";
  }

  if (lastSegment.endsWith(".html")) {
    return lastSegment;
  }

  if (lastSegment === "index") {
    return "index.html";
  }

  return `${lastSegment}.html`;
})();
document.querySelectorAll(".site-nav a[data-page]").forEach((link) => {
  if (link.getAttribute("data-page") === currentPage) {
    link.classList.add("is-active");
  }
});

document.querySelectorAll("[data-current-year]").forEach((yearNode) => {
  yearNode.textContent = String(new Date().getFullYear());
});

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "Thanks for reaching out. This demo form does not send yet, so please email hello@kulmorgroup.com or book a consultation.";
    contactForm.reset();
  });
}
