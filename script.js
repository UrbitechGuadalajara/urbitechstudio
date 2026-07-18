(() => {
  "use strict";

  const body = document.body;
  const header = document.getElementById("site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.getElementById("main-menu");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const sections = [...document.querySelectorAll(".section-observed")];
  const contactModal = document.getElementById("contact-modal");
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const whatsappUrl =
    "https://wa.me/523313628727?text=Hola%2C%20Urbitech.%20Visité%20su%20sitio%20web%20y%20me%20gustaría%20recibir%20información%20para%20crear%20o%20mejorar%20la%20página%20de%20mi%20negocio.";


  function setHeaderState() {
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  }

  function closeMenu() {
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    body.classList.remove("menu-open");
  }

  function openModal(modal) {
    if (!modal) return;
    closeMenu();
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");

    const firstFocusable = modal.querySelector(
      "button, a[href], input, select, textarea"
    );

    window.setTimeout(() => firstFocusable?.focus(), 50);
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    if (!document.querySelector(".modal.is-open")) {
      body.classList.remove("modal-open");
    }
  }

  menuButton?.addEventListener("click", () => {
    const willOpen = !menu.classList.contains("is-open");
    menu.classList.toggle("is-open", willOpen);
    menuButton.setAttribute("aria-expanded", String(willOpen));
    body.classList.toggle("menu-open", willOpen);
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  document.querySelectorAll(".js-open-contact").forEach((button) => {
    button.addEventListener("click", () => {
      openModal(contactModal);
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", () => closeModal(contactModal));
  });



  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeMenu();
    closeModal(contactModal);
  });

  const revealElements = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -45px" }
    );

    revealElements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
      revealObserver.observe(element);
    });
  }

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        navLinks.forEach((link) => {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === `#${visible.target.id}`
          );
        });
      },
      {
        threshold: [0.2, 0.35, 0.55],
        rootMargin: `-${parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--header-height"
          ),
          10
        )}px 0px -45%`
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  let parallaxFrame = null;

  function updateParallax() {
    parallaxFrame = null;
    if (prefersReducedMotion || window.innerWidth <= 860) return;

    document.querySelectorAll(".parallax-item").forEach((element) => {
      const speed = Number(element.dataset.parallax || 0.03);
      const rect = element.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - rect.top) * speed;
      element.style.transform = `translate3d(0, ${Math.max(
        -14,
        Math.min(14, offset)
      )}px, 0)`;
    });
  }

  function onScroll() {
    setHeaderState();

    if (!parallaxFrame) {
      parallaxFrame = requestAnimationFrame(updateParallax);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateParallax);
  setHeaderState();
  updateParallax();

  contactForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    contactForm.classList.add("is-loading");
    formStatus.textContent = "";
    formStatus.className = "form-status";

    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("No fue posible enviar el formulario.");
      }

      contactForm.reset();
      formStatus.textContent =
        "Gracias por contarnos sobre tu proyecto. Recibimos tu solicitud y te responderemos dentro de 1 día hábil.";
      formStatus.classList.add("is-success");
    } catch (error) {
      formStatus.innerHTML =
        `No pudimos enviar la solicitud. Intenta nuevamente o <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">escríbenos por WhatsApp</a>.`;
      formStatus.classList.add("is-error");
    } finally {
      contactForm.classList.remove("is-loading");
      submitButton.disabled = false;
    }
  });

  document.querySelectorAll(".concept-filter").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      document.querySelectorAll(".concept-filter").forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });

      document.querySelectorAll(".concept-card").forEach((card) => {
        const show = filter === "todos" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  document.getElementById("current-year").textContent =
    new Date().getFullYear();
})();
