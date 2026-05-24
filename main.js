document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText);

  // ─── PRELOADER ────────────────────────────────────────────────────────────
  const preloader   = document.getElementById("preloader");
  const fill        = document.querySelector(".preloader-fill");

  gsap.timeline({
    onComplete: () => {
      preloader.style.display = "none";
      initAll();
    }
  })
  .to(fill, { width: "100%", duration: 1.4, ease: "power2.inOut" })
  .to(preloader, { yPercent: -100, duration: 0.9, ease: "power3.inOut", delay: 0.2 });

  // ─── CURSOR ────────────────────────────────────────────────────────────────
  const cursorDot  = document.getElementById("cursor-dot");
  const cursorRing = document.getElementById("cursor-ring");
  let mx = 0, my = 0, rx = 0, ry = 0;

  window.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });
  gsap.set([cursorDot, cursorRing], { xPercent: -50, yPercent: -50 });
  gsap.ticker.add(() => {
    gsap.set(cursorDot, { x: mx, y: my });
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    gsap.set(cursorRing, { x: rx, y: ry });
  });

  document.querySelectorAll("a, button, [data-service], [data-team-card]").forEach(el => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });

  // ─── MAIN INIT ─────────────────────────────────────────────────────────────
  function initAll() {
    initSmoother();
    initNav();
    initHero();
    initCounters();
    initReveals();
    initServices();
    initTeam();
    initGallery();
    initMethod();
  }

  // ─── SCROLL SMOOTHER ──────────────────────────────────────────────────────
  function initSmoother() {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.4,
      effects: true,
    });

    document.querySelectorAll("a[href^='#']").forEach(link => {
      link.addEventListener("click", e => {
        const hash = link.getAttribute("href");
        if (hash === "#") return;
        const target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        smoother.scrollTo(target, true, "top 80px");
      });
    });

    window._smoother = smoother;
  }

  // ─── NAVBAR ────────────────────────────────────────────────────────────────
  function initNav() {
    const navbar     = document.getElementById("navbar");
    const burger     = document.getElementById("navBurger");
    const mobileMenu = document.getElementById("mobileMenu");
    let menuOpen = false;

    ScrollTrigger.create({
      start: "80px top",
      onEnter:     () => navbar.classList.add("scrolled"),
      onLeaveBack: () => navbar.classList.remove("scrolled"),
    });

    burger.addEventListener("click", () => {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle("open", menuOpen);
      document.body.style.overflow = menuOpen ? "hidden" : "";
    });

    document.querySelectorAll("[data-mobile-nav]").forEach(a => {
      a.addEventListener("click", () => {
        menuOpen = false;
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });

    gsap.from(navbar, { y: -80, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.1 });
  }

  // ─── HERO ──────────────────────────────────────────────────────────────────
  function initHero() {
    gsap.to(".hero-bg", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".s-hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    gsap.from(".hero-bg", { scale: 1.18, duration: 2.2, ease: "power3.out" });

    document.fonts.ready.then(() => {
      document.querySelectorAll("[data-hero-line]").forEach(line => {
        const split = SplitText.create(line, { type: "chars" });
        gsap.from(split.chars, {
          yPercent: 120,
          opacity: 0,
          duration: 1.0,
          stagger: 0.025,
          ease: "power4.out",
          delay: 0.3,
        });
      });
    });

    gsap.from([".hero-eyebrow", ".hero-bottom", ".hero-scroll-hint", ".hero-counter"], {
      opacity: 0, y: 20, duration: 1.0, stagger: 0.12,
      ease: "power2.out", delay: 0.8,
    });
  }

  // ─── COUNTERS ──────────────────────────────────────────────────────────────
  function initCounters() {
    document.querySelectorAll("[data-count]").forEach(el => {
      const target = parseInt(el.dataset.count);
      ScrollTrigger.create({
        trigger: el, start: "top 90%", once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target, duration: 1.8, ease: "power2.out",
            onUpdate: function() {
              const v = Math.round(this.targets()[0].val);
              el.textContent = target >= 1000 ? v.toLocaleString("es-CL") : v;
            }
          });
        }
      });
    });
  }

  // ─── GENERIC REVEALS ───────────────────────────────────────────────────────
  function initReveals() {
    gsap.utils.toArray(".reveal-up, .reveal-left, .reveal-right").forEach(el => {
      const isLeft  = el.classList.contains("reveal-left");
      const isRight = el.classList.contains("reveal-right");
      const delay   = parseFloat(getComputedStyle(el).getPropertyValue("--delay")) || 0;
      const from = isLeft  ? { x: -50, opacity: 0 }
                 : isRight ? { x:  50, opacity: 0 }
                 :           { y:  50, opacity: 0 };

      gsap.from(el, {
        ...from, duration: 0.9, ease: "power3.out", delay,
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
  }

  // ─── SERVICES ──────────────────────────────────────────────────────────────
  function initServices() {
    document.querySelectorAll(".service-item").forEach((card, i) => {
      gsap.from(card, {
        opacity: 0, y: 40, duration: 0.7, delay: i * 0.07,
        ease: "power2.out",
        scrollTrigger: { trigger: card, start: "top 90%" },
      });
    });
  }

  // ─── TEAM ──────────────────────────────────────────────────────────────────
  function initTeam() {
    document.querySelectorAll(".team-card").forEach((card, i) => {
      gsap.from(card, {
        opacity: 0, y: 60, duration: 0.9, delay: i * 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%" },
      });
    });
  }

  // ─── GALLERY ───────────────────────────────────────────────────────────────
  function initGallery() {
    document.querySelectorAll(".gallery-item").forEach((item, i) => {
      gsap.from(item, {
        opacity: 0, scale: 0.96, duration: 0.9, delay: i * 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: item, start: "top 90%" },
      });
    });
  }

  // ─── METHODOLOGY ───────────────────────────────────────────────────────────
  function initMethod() {
    document.querySelectorAll(".method-card").forEach((card, i) => {
      gsap.from(card, {
        opacity: 0, x: 50, duration: 0.8, delay: i * 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: card, start: "top 88%" },
      });
    });

    document.fonts.ready.then(() => {
      const heading = document.querySelector(".method-heading");
      if (!heading) return;
      const split = SplitText.create(heading, { type: "lines" });
      gsap.from(split.lines, {
        opacity: 0, y: 40, duration: 0.8, stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: heading, start: "top 85%" },
      });
    });
  }

});
