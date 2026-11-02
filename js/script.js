/* ==========================================================================
   Mourad Segrati – Portfolio | script.js
   Each feature lives in its own small function so it is easy to read.
   1. Helpers            5. Typing effect
   2. Navbar & menu      6. Project filters
   3. Active link        7. Contact form validation
   4. Scroll reveal      8. Misc (CV, demo links, year, photo fallback)
   ========================================================================== */

(() => {
  "use strict";

  /* 1. HELPERS ----------------------------------------------------------- */
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Small message at the bottom of the screen
  const toast = $("#toast");
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3500);
  }

  /* 2. NAVBAR & MOBILE MENU --------------------------------------------- */
  const navbar = $("#navbar");
  const navToggle = $("#nav-toggle");
  const navLinks = $("#nav-links");
  const toTop = $("#to-top");

  function setMenu(open) {
    navLinks.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  }

  navToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));

  // Close the menu after clicking a link, pressing Escape, or resizing to desktop
  $$(".nav-link").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  window.addEventListener("resize", () => { if (window.innerWidth > 820) setMenu(false); });

  // Add background to navbar and show "back to top" after scrolling
  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
    toTop.classList.toggle("show", window.scrollY > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* 3. ACTIVE LINK ON SCROLL -------------------------------------------- */
  const sections = $$("main section[id]");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        $$(".nav-link").forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" } // trigger when section crosses the middle of the screen
  );
  sections.forEach((section) => sectionObserver.observe(section));

  /* 4. SCROLL REVEAL ANIMATION ------------------------------------------ */
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add("visible");
          observer.unobserve(el); // animate only once
          // Once the entrance animation ends, drop the reveal classes so
          // other effects (like card hover lift) work without interference
          setTimeout(() => el.classList.remove("reveal", "visible"), 1700);
        }
      });
    },
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el) => revealObserver.observe(el));

  /* 5. TYPING EFFECT (hero) --------------------------------------------- */
  const typedEl = $("#typed");
  const phrases = ["Web Development", "Software Development", "Database Management", "Technical Support"];

  function typeLoop() {
    let phraseIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      const current = phrases[phraseIndex];
      charIndex += deleting ? -1 : 1;
      typedEl.textContent = "> " + current.slice(0, charIndex);

      let delay = deleting ? 40 : 85;
      if (!deleting && charIndex === current.length) { deleting = true; delay = 1600; }
      else if (deleting && charIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 400; }
      setTimeout(tick, delay);
    }
    tick();
  }

  if (prefersReducedMotion) typedEl.textContent = "> " + phrases.join(" · ");
  else typeLoop();

  /* 6. PROJECT FILTERS --------------------------------------------------- */
  const filterButtons = $$(".filter-btn");
  const projectCards = $$(".project");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      // Update button states
      filterButtons.forEach((b) => {
        const isActive = b === button;
        b.classList.toggle("active", isActive);
        b.setAttribute("aria-pressed", String(isActive));
      });

      // Show / hide cards
      projectCards.forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hide", !match);
        card.classList.remove("fade-in");
        if (match) {
          card.classList.add("visible"); // make sure it isn't stuck hidden by reveal
          void card.offsetWidth;         // restart CSS animation
          card.classList.add("fade-in");
        }
      });
    });
  });

  /* 7. CONTACT FORM VALIDATION ------------------------------------------ */
  const form = $("#contact-form");
  const statusEl = $("#form-status");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // One rule per field: returns an error message, or "" when valid
  const rules = {
    name: (v) => (v.length < 2 ? "Please enter your name (at least 2 characters)." : ""),
    email: (v) => (!v ? "Please enter your email." : !emailPattern.test(v) ? "Please enter a valid email address." : ""),
    subject: (v) => (v.length < 3 ? "Please add a subject (at least 3 characters)." : ""),
    message: (v) => (v.length < 10 ? "Your message should be at least 10 characters." : ""),
  };

  function validateField(input) {
    const field = input.closest(".field");
    const error = rules[input.name](input.value.trim());
    $(".error", field).textContent = error;
    field.classList.toggle("invalid", Boolean(error));
    field.classList.toggle("valid", !error);
    input.setAttribute("aria-invalid", String(Boolean(error)));
    return !error;
  }

  const inputs = $$("input, textarea", form);
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => { if (input.closest(".field").classList.contains("invalid")) validateField(input); });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    statusEl.textContent = "";
    statusEl.classList.remove("ok");

    // Validate every field (don't stop at the first error)
    const results = inputs.map(validateField);
    if (results.includes(false)) {
      inputs.find((i) => i.closest(".field").classList.contains("invalid")).focus();
      return;
    }

    // No backend yet: open the visitor's email app with the message pre-filled
    const data = Object.fromEntries(new FormData(form));
    const body = `${data.message}\n\n— ${data.name} (${data.email})`;
    const mailto = `mailto:morsegrati11@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    statusEl.textContent = "Thanks! Your email app should open with the message ready to send.";
    statusEl.classList.add("ok");
    showToast("Message ready – thank you!");
    form.reset();
    $$(".field", form).forEach((f) => f.classList.remove("valid", "invalid"));
  });

  /* 8. MISC -------------------------------------------------------------- */

  // Footer year
  $("#year").textContent = new Date().getFullYear();

  // Live demo links are placeholders until real projects are published
  $$("[data-demo]").forEach((link) =>
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showToast("Live demo coming soon – this is a placeholder project.");
    })
  );

  // CV download: if the PDF isn't in /cv yet, tell the user instead of showing a 404
  const cvBtn = $("#cv-btn");
  cvBtn.addEventListener("click", (e) => {
    if (!location.protocol.startsWith("http")) return; // local file: let the browser handle it
    e.preventDefault();
    fetch(cvBtn.href, { method: "HEAD" })
      .then((res) => {
        if (!res.ok) throw new Error("missing");
        const a = document.createElement("a");
        a.href = cvBtn.href;
        a.download = "Mourad_Segrati_CV.pdf";
        a.click();
      })
      .catch(() => showToast("CV file not found – add cv/Mourad_Segrati_CV.pdf to the project."));
  });

  // Profile photo: show initials if images/profile.jpg is missing
  const photo = $("#photo-inner img");
  const showFallback = () => $("#photo-inner").classList.add("no-photo");
  photo.addEventListener("error", showFallback);
  if (photo.complete && photo.naturalWidth === 0) showFallback();
})();
