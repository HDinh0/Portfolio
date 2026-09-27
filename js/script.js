(function () {
  "use strict";

  /* =========================================================
     Menu mobile (drawer)
     ========================================================= */
  const hamburger = document.getElementById("hamburger");
  const drawer = document.getElementById("drawer");
  const drawerOverlay = document.getElementById("drawerOverlay");
  const drawerClose = document.getElementById("drawerClose");

  function openDrawer() {
    drawer.classList.add("is-open");
    drawerOverlay.classList.add("is-open");
    hamburger.setAttribute("aria-expanded", "true");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("is-open");
    drawerOverlay.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("is-open");
    isOpen ? closeDrawer() : openDrawer();
  });
  drawerClose.addEventListener("click", closeDrawer);
  drawerOverlay.addEventListener("click", closeDrawer);
  drawer.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  /* =========================================================
     Secção activa no menu (scroll spy)
     ========================================================= */
  const sections = ["main", "galeria", "sobre", "contacto"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const allNavLinks = document.querySelectorAll(".nav-link[data-section]");

  function setActive(sectionId) {
    allNavLinks.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.section === sectionId);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
  }

  /* =========================================================
     Lightbox da galeria
     ========================================================= */
  const galleryCards = document.querySelectorAll(".gallery-card");

  const lightbox = document.getElementById("lightbox");
  const lightboxMedia = document.getElementById("lightboxMedia");
  const lightboxCat = document.getElementById("lightboxCat");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(card) {
    if (!card) return;

    const catEl = card.querySelector(".gallery-card-cat");
    const titleEl = card.querySelector(".gallery-card-title");
    const imgEl = card.querySelector("img");
    const mediaWrapper = card.querySelector(".gallery-card-media");

    const title = (titleEl && titleEl.textContent && titleEl.textContent.trim()) || "";
    const cardA = getComputedStyle(card).getPropertyValue("--card-a") || "#102544";
    const cardB = getComputedStyle(card).getPropertyValue("--card-b") || "#2f6fff";

    lightboxMedia.style.setProperty("--card-a", cardA);
    lightboxMedia.style.setProperty("--card-b", cardB);
    lightboxTitle.textContent = title;

    // Clear previous media
    lightboxMedia.innerHTML = "";
    lightboxMedia.style.backgroundImage = "";

    // Prefer an <img> inside the card, otherwise try a background-image on the media wrapper
    if (imgEl && imgEl.src) {
      const clone = imgEl.cloneNode(true);
      clone.classList.add("lightbox-img");
      lightboxMedia.appendChild(clone);
    } else {
      const bg = mediaWrapper ? getComputedStyle(mediaWrapper).backgroundImage : "";
      if (bg && bg !== "none") {
        lightboxMedia.style.backgroundImage = bg;
        lightboxMedia.style.backgroundSize = "cover";
        lightboxMedia.style.backgroundPosition = "center";
      } else {
        lightboxMedia.textContent = "Imagem indisponível";
      }
    }

    lightbox.classList.add("is-open");
    if (lightbox) lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    if (lightbox) lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    // clean media
    lightboxMedia.innerHTML = "";
    lightboxMedia.style.backgroundImage = "";
  }

  if (galleryCards && galleryCards.length) {
    galleryCards.forEach((card) => {
      card.addEventListener("click", () => openLightbox(card));
    });
  }
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
})();
