(() => {
  "use strict";

  const spaceData = {
    privada: {
      name: "Oficina privada",
      price: "Desde $8,900 / mes",
      detail: "Mobiliario, internet, recepción y domicilio comercial incluidos."
    },
    coworking: {
      name: "Coworking flexible",
      price: "Desde $249 / día",
      detail: "Escritorio, internet, café y acceso a áreas comunes."
    },
    juntas: {
      name: "Sala de juntas",
      price: "Desde $450 / hora",
      detail: "Pantalla, videollamada, café y recepción para invitados."
    }
  };

  const locationData = {
    providencia: {
      zone: "Zona financiera y gastronómica",
      name: "NODO Providencia",
      description:
        "Una sede de perfil ejecutivo, con oficinas privadas, salas de juntas y espacios para equipos en crecimiento.",
      hours: "Lun–Vie · 8:00–20:00",
      types: "Privadas · Coworking · Juntas",
      status: "Inmediata",
      image:
        "https://images.unsplash.com/photo-1497366701829-57e8a0f73d7d?auto=format&fit=crop&w=1600&q=94",
      alt: "Recepción de la sede Providencia"
    },
    chapalita: {
      zone: "Corredor creativo y comercial",
      name: "NODO Chapalita",
      description:
        "Un espacio más relajado para profesionales independientes, equipos creativos y empresas que buscan cercanía.",
      hours: "Lun–Sáb · 8:00–19:00",
      types: "Coworking · Privadas · Eventos",
      status: "Últimos espacios",
      image:
        "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1600&q=94",
      alt: "Área de coworking de la sede Chapalita"
    },
    country: {
      zone: "Distrito corporativo",
      name: "NODO Country Club",
      description:
        "Una sede de imagen premium para equipos que reciben clientes, dirección ejecutiva y operaciones regionales.",
      hours: "Acceso 24/7",
      types: "Privadas · Suites · Juntas",
      status: "Preventa",
      image:
        "https://images.unsplash.com/photo-1497366761666-84b16e70f31c?auto=format&fit=crop&w=1600&q=94",
      alt: "Oficina ejecutiva de la sede Country Club"
    }
  };

  document.querySelectorAll(".space-filter").forEach((button) => {
    button.addEventListener("click", () => {
      const data = spaceData[button.dataset.space];
      if (!data) return;

      document.querySelectorAll(".space-filter").forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });

      document.getElementById("availability-name").textContent = data.name;
      document.getElementById("availability-price").textContent = data.price;
      document.getElementById("availability-detail").textContent = data.detail;
    });
  });

  document.querySelectorAll(".location-tab").forEach((button) => {
    button.addEventListener("click", () => {
      const data = locationData[button.dataset.location];
      if (!data) return;

      document.querySelectorAll(".location-tab").forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });

      const image = document.getElementById("location-image");
      image.style.opacity = "0.35";

      window.setTimeout(() => {
        image.src = data.image;
        image.alt = data.alt;
        document.getElementById("location-zone").textContent = data.zone;
        document.getElementById("location-name").textContent = data.name;
        document.getElementById("location-description").textContent =
          data.description;
        document.getElementById("location-hours").textContent = data.hours;
        document.getElementById("location-types").textContent = data.types;
        document.getElementById("location-status").textContent = data.status;
        image.style.opacity = "1";
      }, 150);
    });
  });

  const locationImage = document.getElementById("location-image");
  if (locationImage) {
    locationImage.style.transition = "opacity 180ms ease";
  }
})();
