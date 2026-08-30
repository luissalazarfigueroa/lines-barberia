document.addEventListener("DOMContentLoaded", () => {
  // ─── GSAP PLUGINS ────────────────────────────────────────────────────────────
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollSmoother,
    ScrollToPlugin,
    SplitText,
    DrawSVGPlugin,
  );

  // ─── SCROLL SMOOTHER ─────────────────────────────────────────────────────────
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.2,
    effects: true,
  });

  const scrollerEl = smoother ? smoother.wrapper() : window;

  // ─── SMOOTH NAV ──────────────────────────────────────────────────────────────
  // Intercepta todos los <a href="#..."> y delega al smoother
  // (sin esto el browser scrollea el wrapper nativo y rompe el efecto)
  const navOffset = 80; // altura del navbar fijo en px

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const hash = link.getAttribute("href");
      if (hash === "#") return; // skip enlaces vacíos

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();

      // Cierra el menú móvil de Bootstrap si está abierto
      const collapse = document.querySelector("#navbarNav.show");
      if (collapse) {
        bootstrap.Collapse.getInstance(collapse)?.hide();
      }

      smoother.scrollTo(target, true, `top ${navOffset}px`);
    });
  });

  // Marca el nav-link activo según la sección visible
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  ScrollTrigger.create({
    scroller: scrollerEl,
    onUpdate: () => {
      const scrollY = smoother.scrollTop();

      sections.forEach((section) => {
        const top = section.offsetTop - navOffset - 10;
        const bottom = top + section.offsetHeight;

        if (scrollY >= top && scrollY < bottom) {
          const id = section.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`,
            );
          });
        }
      });
    },
  });

  // Nota: el color del logo al hacer scroll ahora lo maneja el CSS
  // (#navbar.scrolled .nav-logo svg) vía initBasicNav() más abajo.

  // ─── LÍNEA HERO (DrawSVG al cargar) ──────────────────────────────────────────
  if (document.querySelector("#lineaUno")) {
    gsap.set("#lineaUno", { drawSVG: "0%" });
    gsap.fromTo(
      "#lineaUno",
      { drawSVG: "0%" },
      { drawSVG: "0% 100%", duration: 2, ease: "power2.out" },
    );
  }

  // ─── SHAVE SVG RESPONSIVE ────────────────────────────────────────────────────
  /**
   * Genera un path SVG de zigzag ondulado que cubre W × H completamente.
   * Cada pasada es una curva cuadrática suave que alterna dirección.
   * Las pasadas se conectan con una curva cúbica que "baja" por el lado del muro.
   */
  function buildShavePath(W, H) {
    const passes = Math.max(4, Math.ceil(H / 65));
    const rowH = H / passes;
    const strokeWidth = rowH * 1.35;
    const amp = rowH * 0.3;

    let d = "";

    for (let i = 0; i < passes; i++) {
      const yC = rowH * (i + 0.5);
      const toRight = i % 2 === 0;
      const xA = toRight ? 0 : W;
      const xB = toRight ? W : 0;
      const cpY = yC + (toRight ? amp : -amp);

      if (i === 0) {
        d += `M ${xA} ${yC} `;
      } else {
        const prevY = rowH * (i - 0.5);
        d += `C ${xA} ${prevY + rowH * 0.65}
              ${xA} ${yC - rowH * 0.25}
              ${xA} ${yC} `;
      }

      d += `Q ${W / 2} ${cpY} ${xB} ${yC} `;
    }

    return { d, strokeWidth };
  }

  let shaveAnim = null;

  function initShave() {
    const section = document.getElementById("productos");
    const svg = document.getElementById("shaveSvg");
    const path = document.getElementById("shave");
    if (!section || !svg || !path) return;

    const W = section.offsetWidth;
    const H = section.offsetHeight;
    if (!W || !H) return;

    const { d, strokeWidth } = buildShavePath(W, H);

    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    path.setAttribute("d", d);
    path.setAttribute("stroke-width", strokeWidth);

    if (shaveAnim) {
      shaveAnim.scrollTrigger?.kill();
      shaveAnim.kill();
      shaveAnim = null;
    }

    gsap.set(path, { drawSVG: "0% 0%" });

    shaveAnim = gsap.fromTo(
      path,
      { drawSVG: "0% 0%" },
      {
        drawSVG: "0% 100%",
        duration: 3,
        ease: "linear",
        scrollTrigger: {
          trigger: "#productos",
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }

  // Resize con debounce de 200 ms
  let _resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      initShave();
    }, 200);
  });

  if (document.readyState === "complete") {
    initShave();
  } else {
    window.addEventListener("load", initShave);
  }

  // ─── LÍNEA DOS (barberos section) ────────────────────────────────────────────
  if (document.querySelector("#lineaDos")) {
    gsap.set("#lineaDos", { drawSVG: "0% 0%" });
    gsap.fromTo(
      "#lineaDos",
      { drawSVG: "0% 0%" },
      {
        drawSVG: "0% 50%",
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#lineaDos",
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }

  // ─── NAV ENTRADA ─────────────────────────────────────────────────────────────
  gsap.from("nav", { y: -200, duration: 2 });
  gsap.from(".navbar-brand", { y: -200, duration: 2 });

  // ─── SPLIT TEXT BAJADA ───────────────────────────────────────────────────────
  if (document.querySelector(".bajada")) {
    document.fonts.ready.then(() => {
      const splitText = SplitText.create(".bajada", {
        type: "words,chars,lines",
      });

      gsap.from(splitText.chars, {
        scrollTrigger: {
          trigger: ".bajada",
          toggleActions: "play reverse play reverse",
        },
        x: 60,
        autoAlpha: 0,
        ease: "power1.out",
        stagger: { amount: 0.4 },
      });
    });
  }

  // ─── FLIP CARDS (barberos) ───────────────────────────────────────────────────
  const cards = document.querySelectorAll(".flip-card");
  if (cards.length) {
    const triggerEl =
      document.querySelector(".card-lines")?.parentElement || document.body;

    const flipTl = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.out", duration: 0.4 },
    });

    flipTl
      .to({}, { duration: 0.25 }) // pequeña pausa antes de empezar
      .to(cards, {
        rotateY: 180,
        stagger: { each: 0.15, from: "random" },
      });

    ScrollTrigger.create({
      trigger: triggerEl,
      start: "top 70%",
      onEnter: () => flipTl.play(),
      onLeaveBack: () => flipTl.reverse(),
    });
  }

  // ─── TARJETAS SUELTAS (parallax) ─────────────────────────────────────────────
  if (document.querySelector(".card-loose-1")) {
    gsap.from(".card-loose-1", {
      x: 200,
      rotate: 4,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: { trigger: ".card-loose-1", scrub: true },
    });
  }
  if (document.querySelector(".card-loose-2")) {
    gsap.from(".card-loose-2", {
      x: -200,
      rotate: -4,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: { trigger: ".card-loose-2", scrub: true },
    });
  }

  // ─── HERO ANIMATIONS ─────────────────────────────────────────────────────────
  if (document.querySelector(".hero-bg")) {
    gsap.from(".hero-bg", {
      scale: 1.3,
      filter: "blur(10px)",
      duration: 3,
      ease: "power4.out",
    });
  }
  if (document.querySelector("h1")) {
    gsap.from("h1", { scale: 0.9, duration: 3, ease: "power2.out" });
  }
  if (document.querySelector(".btn-lines")) {
    gsap.from(".btn-lines", {
      y: 20,
      delay: 1,
      duration: 1,
      ease: "power2.out",
      autoAlpha: 0,
    });
  }

  // ─── REVEAL-UP (scroll) ──────────────────────────────────────────────────────
  gsap.utils.toArray(".reveal-up").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  // ─── BTN-LINES HOVER (tijeras animadas) ──────────────────────────────────────
  let intervalId = null;
  const btn = document.querySelector(".btn-lines");
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");

  if (btn && left && right) {
    btn.addEventListener("mouseover", () => {
      if (intervalId === null) {
        intervalId = setInterval(() => {
          left.classList.toggle("active");
          right.classList.toggle("active");
        }, 200);
      }
    });

    btn.addEventListener("mouseleave", () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
        left.classList.remove("active");
        right.classList.remove("active");
      }
    });
  }

  // ─── GEOMETRIC CANVAS BACKGROUNDS ───────────────────────────────────────────
  function initGeometricCanvas(canvasId, options) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let lines = [];
    const colors = options.colors || ["#ffffff"];

    function resize() {
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      generateLines();
    }

    function generateLines() {
      lines = [];
      const numLines = options.numLines || 25;
      const maxL = Math.max(width, height) * 1.5;
      const allowedAngles = [15, 30, 45, 60, 75, 105, 120, 135, 150, 165];

      let attempts = 0;
      while (lines.length < numLines && attempts < 500) {
        attempts++;
        let cx = Math.random() * width;
        let cy = Math.random() * height;
        let angleDeg =
          allowedAngles[Math.floor(Math.random() * allowedAngles.length)];
        let theta = (angleDeg * Math.PI) / 180;

        let isTooSimilar = false;
        let nx = -Math.sin(theta);
        let ny = Math.cos(theta);

        for (let i = 0; i < lines.length; i++) {
          let other = lines[i];
          if (Math.abs(other.theta - theta) < 0.01) {
            let dist = Math.abs((cx - other.bx) * nx + (cy - other.by) * ny);
            let minDist = options.minDist || 150;
            if (dist < minDist) {
              isTooSimilar = true;
              break;
            }
          }
        }

        if (isTooSimilar) continue;

        let z = 0.1 + Math.random() * 1.5;
        let opacity =
          (options.opacityBase || 0.05) + z * (options.opacityVar || 0.1);

        lines.push({
          bx: cx,
          by: cy,
          theta: theta,
          z: z,
          opacity: opacity,
          maxL: maxL,
          colorType: Math.floor(Math.random() * colors.length),
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        ctx.globalAlpha = line.opacity;
        ctx.strokeStyle = colors[line.colorType];
        ctx.lineWidth = line.z > 1.2 ? 1.5 : 1;

        let cx = line.bx;
        let cy = line.by;
        let drawDx = Math.cos(line.theta);
        let drawDy = Math.sin(line.theta);

        ctx.beginPath();
        ctx.moveTo(cx - drawDx * line.maxL, cy - drawDy * line.maxL);
        ctx.lineTo(cx + drawDx * line.maxL, cy + drawDy * line.maxL);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;
    }

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        draw();
      }, 150);
    });

    resize();
    draw();
  }

  // Inicializar canvas geométricos
  initGeometricCanvas("heroCanvas", {
    colors: ["#ffffff"],
    numLines: 3,
    minDist: 380,
    opacityBase: 0.3,
    opacityVar: 0.3,
  });

  initGeometricCanvas("teamCanvas", {
    colors: ["#b1b1b1"],
    numLines: 8,
    minDist: 150,
    opacityBase: 0.4,
    opacityVar: 0.5,
  });

  // ─── NAVBAR ────────────────────────────────────────────────────────────────
  function initBasicNav() {
    const navbar = document.getElementById("navbar");

    if (navbar) {
      // Páginas sin hero/banner oscuro al inicio (singles, carrito, checkout)
      // deben partir con el nav en su estado "scrolled" (oscuro sobre claro),
      // porque de lo contrario el logo y los links claros quedan invisibles
      // sobre el fondo claro hasta que el usuario haga scroll.
      const firstSection = document.querySelector("#smooth-content")
        ?.firstElementChild;
      const startsDark =
        firstSection &&
        (firstSection.classList.contains("s-hero") ||
          firstSection.classList.contains("bg-dark"));

      const updateNavbar = () =>
        navbar.classList.toggle(
          "scrolled",
          !startsDark || window.scrollY > 80,
        );
      updateNavbar();
      window.addEventListener("scroll", updateNavbar, { passive: true });
    }

    // Cerrar menú móvil al hacer click en un enlace
    document.querySelectorAll(".nav-link, .nav-cta").forEach((a) => {
      a.addEventListener("click", () => {
        const navbarCollapse = document.getElementById("navbarContent");
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          // Bootstrap 5 collapse hide
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false,
          });
          bsCollapse.hide();
        }
      });
    });
  }

  initBasicNav();
});
