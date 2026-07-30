(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme toggle ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const iconSun = document.getElementById("iconSun");
  const iconMoon = document.getElementById("iconMoon");
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      iconSun.style.display = "none";
      iconMoon.style.display = "block";
    } else {
      root.removeAttribute("data-theme");
      iconSun.style.display = "block";
      iconMoon.style.display = "none";
    }
  }

  let savedTheme = "light";
  try { savedTheme = localStorage.getItem("pc-theme") || "light"; } catch (e) {}
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("pc-theme", next); } catch (e) {}
  });

  /* ---------- Hero name typing effect ---------- */
  const typedEl = document.getElementById("typedName");
  if (typedEl && !reduceMotion) {
    const fullText = typedEl.textContent;
    typedEl.textContent = "";
    typedEl.style.borderRight = "3px solid var(--primary)";
    let i = 0;
    const type = () => {
      if (i <= fullText.length) {
        typedEl.textContent = fullText.slice(0, i);
        i++;
        setTimeout(type, 90);
      } else {
        setTimeout(() => (typedEl.style.borderRight = "none"), 600);
      }
    };
    setTimeout(type, 400);
  }

  /* ---------- Navbar scroll state + progress bar ---------- */
  const navbar = document.getElementById("navbar");
  const progressBar = document.getElementById("progressBar");

  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 12);
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    progressBar.style.width = progress + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  menuToggle.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    menuToggle.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- Active section highlighting ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link[data-section]");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add("in-view"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("in-view"), i * 40);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll("[data-counter]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.counter, 10);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 30));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + "+";
        }, 40);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => counterObserver.observe(c));

  /* ---------- Magnetic buttons ---------- */
  if (!reduceMotion && matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ---------- Cursor glow ---------- */
  const cursorGlow = document.getElementById("cursorGlow");
  if (!reduceMotion && matchMedia("(hover: hover)").matches) {
    window.addEventListener("mousemove", (e) => {
      cursorGlow.style.opacity = "1";
      cursorGlow.style.left = e.clientX + "px";
      cursorGlow.style.top = e.clientY + "px";
    });
    window.addEventListener("mouseleave", () => (cursorGlow.style.opacity = "0"));
  }

  /* ---------- Project tilt ---------- */
  if (!reduceMotion && matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".tilt").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ---------- Particles background ---------- */
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let animId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = Math.min(window.innerHeight, 900);
  }

  function initParticles() {
    const count = window.innerWidth < 700 ? 26 : 55;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isDark = root.getAttribute("data-theme") === "dark";
    ctx.fillStyle = isDark ? "rgba(96,165,250,0.5)" : "rgba(37,99,235,0.35)";
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    animId = requestAnimationFrame(drawParticles);
  }

  if (!reduceMotion) {
    resizeCanvas();
    initParticles();
    drawParticles();
    window.addEventListener("resize", () => {
      resizeCanvas();
      initParticles();
    });
  }

  /* ---------- Back to top ---------- */
  document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ---------- Contact form ---------- */
  const form = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");
  const submitBtn = document.getElementById("submitBtn");

  function validateField(field, testFn) {
    const wrapper = field.closest(".field");
    const valid = testFn(field.value.trim());
    wrapper.classList.toggle("invalid", !valid);
    return valid;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const subject = form.querySelector("#subject");
    const message = form.querySelector("#message");

    const okName = validateField(name, (v) => v.length > 1);
    const okEmail = validateField(email, (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
    const okSubject = validateField(subject, (v) => v.length > 1);
    const okMessage = validateField(message, (v) => v.length > 4);

    if (!(okName && okEmail && okSubject && okMessage)) {
      formNote.textContent = "Please fix the highlighted fields.";
      formNote.classList.remove("success");
      return;
    }

    // If EmailJS is configured (emailjs loaded + IDs set), send via EmailJS.
    // Otherwise fall back to opening the user's mail client with a pre-filled message.
    submitBtn.disabled = true;
    formNote.textContent = "Sending...";
    formNote.classList.remove("success");

    const payload = {
      name: name.value.trim(),
      email: email.value.trim(),
      subject: subject.value.trim(),
      message: message.value.trim(),
    };

    if (window.emailjs && window.EMAILJS_SERVICE_ID && window.EMAILJS_TEMPLATE_ID) {
      window.emailjs
        .send(window.EMAILJS_SERVICE_ID, window.EMAILJS_TEMPLATE_ID, payload)
        .then(() => {
          formNote.textContent = "Message sent! I'll get back to you soon.";
          formNote.classList.add("success");
          form.reset();
        })
        .catch(() => {
          formNote.textContent = "Something went wrong. Please email me directly instead.";
        })
        .finally(() => (submitBtn.disabled = false));
    } else {
      const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=prathmesh0033@gmail.com&su=${encodeURIComponent(
        payload.subject
      )}&body=${encodeURIComponent(payload.message + "\n\n— " + payload.name + " (" + payload.email + ")")}`;
      window.open(gmailCompose, "_blank", "noopener");
      formNote.textContent = "Opening Gmail...";
      submitBtn.disabled = false;
    }
  });

  /* ---------- Smooth-scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });
})();
