document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollSmoother,
    ScrollToPlugin,
    SplitText,
    TextPlugin,
    DrawSVGPlugin,
    MorphSVGPlugin,
  );
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.2,
    effects: true,
  });

  const logo = document.querySelector("#logo");

  const scrollerEl = smoother ? smoother.wrapper() : window;

  // Estado inicial (antes de pasar el final de la hero)
  gsap.set(logo, { fill: "var(--light-color)" });

  ScrollTrigger.create({
    trigger: "#secondSection",
    scroller: scrollerEl,
    start: "top top", // cuando el final de .s-hero llega al final del viewport
    onEnter: () =>
      gsap.to(logo, {
        fill: "var(--main-color)",
        duration: 0.2,
        overwrite: "auto",
      }),
    onLeaveBack: () =>
      gsap.to(logo, {
        fill: "var(--light-color)",
        duration: 0.2,
        overwrite: "auto",
      }),
  });

  gsap.set("#lineaUno", { drawSVG: "0%" });
  gsap.fromTo(
    "#lineaUno",
    {
      drawSVG: "0%",
    },
    {
      drawSVG: "0% 100%",
      duration: 2,
      ease: "power2.out",
    },
  );

  // ─── SHAVE RESPONSIVE ────────────────────────────────────────────────────────

  /**
   * Genera un path SVG de zigzag ondulado que cubre W × H completamente.
   * Cada pasada es una curva cuadrática suave que alterna dirección.
   * Las pasadas se conectan con una curva cúbica que "baja" por el lado del muro.
   *
   * @param {number} W  - ancho del área en px
   * @param {number} H  - alto del área en px
   * @returns {{ d: string, strokeWidth: number }}
   */
  function buildShavePath(W, H) {
    // Una pasada cada ~65px. Mínimo 4 para que siempre haya movimiento visible.
    const passes = Math.max(4, Math.ceil(H / 65));
    const rowH = H / passes;

    // El trazo debe solapar las filas vecinas (130 %) para no dejar gaps.
    const strokeWidth = rowH * 1.35;

    // Amplitud de la onda: 30 % del alto de fila hacia arriba/abajo.
    const amp = rowH * 0.3;

    let d = "";

    for (let i = 0; i < passes; i++) {
      const yC = rowH * (i + 0.5); // centro vertical de esta pasada
      const toRight = i % 2 === 0;

      const xA = toRight ? 0 : W; // punto de inicio
      const xB = toRight ? W : 0; // punto de llegada

      // La onda curva hacia el lado contrario cada pasada (zig vs zag)
      const cpY = yC + (toRight ? amp : -amp);

      if (i === 0) {
        // Primera pasada: movemos el cursor al punto de inicio
        d += `M ${xA} ${yC} `;
      } else {
        // Conector: curva cúbica que "resbala" por el muro lateral sin cruzar
        // el interior. Los dos control-points quedan pegados al lado (xA).
        const prevY = rowH * (i - 0.5);
        d += `C ${xA} ${prevY + rowH * 0.65}
              ${xA} ${yC - rowH * 0.25}
              ${xA} ${yC} `;
      }

      // Pasada horizontal ondulada (curva cuadrática con punto de control central)
      d += `Q ${W / 2} ${cpY} ${xB} ${yC} `;
    }

    return { d, strokeWidth };
  }

  // Referencia a la animación activa (para poder matarla en resize)
  let shaveAnim = null;

  function initShave() {
    const section = document.getElementById("corteDeBarba");
    const svg = document.getElementById("shaveSvg");
    const path = document.getElementById("shave");
    if (!section || !svg || !path) return;

    const W = section.offsetWidth;
    const H = section.offsetHeight;
    if (!W || !H) return;

    const { d, strokeWidth } = buildShavePath(W, H);

    // Actualizar geometría del SVG
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    path.setAttribute("d", d);
    path.setAttribute("stroke-width", strokeWidth);

    // Matar la animación anterior antes de recrearla
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
          trigger: "#corteDeBarba",
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

  // Inicialización: esperar a que el layout esté listo
  // (window.onload asegura que las imágenes ya inflaron el alto de la sección)
  if (document.readyState === "complete") {
    initShave();
  } else {
    window.addEventListener("load", initShave);
  }

  gsap.set("#lineaDos", { drawSVG: "0% 0%" });

  gsap.fromTo(
    "#lineaDos",
    { drawSVG: "0% 0%" },
    {
      drawSVG: "0% 50%",
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        // 👈 minúsculas
        trigger: "#lineaDos",
        start: "top 85%",
        end: "top 60%",
        toggleActions: "play none none reverse",
        // markers: true,         // 👈 para debug
      },
    },
  );

  gsap.from("nav", {
    y: -200,
    duration: 2,
  });

  gsap.from(".navbar-brand", {
    y: -200,
    duration: 2,
  });

  if (document.querySelector(".bajada")) {
    document.fonts.ready.then(() => {
      let splitText = SplitText.create(".bajada", {
        type: "words,chars,lines",
      });

      let chars = splitText.chars; //an array of all the divs that wrap each character

      gsap.from(chars, {
        scrollTrigger: {
          trigger: ".bajada",
          toggleActions: "play reverse play reverse",
        },
        x: 60,
        autoAlpha: 0,
        ease: "power1.out",
        stagger: {
          amount: 0.4,
        },
      });
    });
  }

  // 1) Construir las cartas (igual que antes)
  const cards = document.querySelectorAll(".flip-card");
  // 2) Trigger único: usamos el padre común de las .col
  // Si tus .col están dentro de un contenedor tipo ".profiles-grid", mejor poné ese selector.
  const triggerEl =
    document.querySelector(".card-lines")?.parentElement || document.body;

  // 3) Timeline con delay + stagger (scatter)
  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.out", duration: 0.4 },
  });

  // "espera un poquito" antes de empezar
  tl.to({}, { duration: 0.25 }); // 0.25s de pausa

  // scatter: stagger con from:"random"
  tl.to(cards, {
    rotateY: 180,
    stagger: {
      each: 0.15, // separación entre cartas
      from: "random", // orden aleatorio (scatter)
    },
  });

  ScrollTrigger.create({
    trigger: triggerEl,
    start: "top 70%",
    // markers: true,
    onEnter: () => tl.play(),
    onLeaveBack: () => tl.reverse(), // si scrolleás hacia arriba vuelve
  });

  gsap.from(".card-loose-1", {
    x: 200,
    rotate: 4,
    duration: 1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".card-loose-1",
      scrub: true,
    },
  });
  gsap.from(".card-loose-2", {
    x: -200,
    rotate: -4,
    duration: 1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".card-loose-2",
      scrub: true,
    },
  });

  gsap.from(".hero-bg", {
    scale: 1.3,
    filter: "blur(10px)",
    duration: 3,
    ease: "power4.out",
  });

  gsap.from("h1", {
    scale: 0.9,
    duration: 3,
    ease: "power2.out",
  });

  gsap.from(".hero-logo", {
    x: 500,
    duration: 1,
    delay: 1,
    ease: "circ.inOut",
  });
  gsap.from(".btn-lines", {
    y: 20,
    delay: 1,
    duration: 1,
    ease: "power2.out",
    autoAlpha: 0,
  });

  gsap.from("#carWrap", {
    delay: 1,
    x: 200,
    autoAlpha: 0,
    duration: 2,
    ease: "power2.out",
  });
  // Efecto del botón .btn-lines

  let intervalId = null;
  const btn = document.querySelector(".btn-lines");
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");

  if (!btn || !left || !right) return;

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

  const keyWord = document.getElementById("keyword");
  let num;

  setInterval(() => {
    let prev = num;
    num = Math.floor(Math.random() * 3);
    if (prev !== num) {
      cambiarFont(num);
    } else cambiarFont(3);
  }, 100);

  function cambiarFont(f) {
    switch (f) {
      case 0:
        keyWord.style.fontFamily = `Rock Salt, cursive`;
        keyWord.style.fontSize = "40px";
        keyWord.style.lineHeight = "0px";
        break;
      case 1:
        keyWord.style.fontFamily = `Caveat, cursive`;
        keyWord.style.fontSize = "40px";
        keyWord.style.lineHeight = "0px";

        break;

      case 2:
        keyWord.style.fontFamily = "Sedgwick Ave, cursive";
        keyWord.style.fontSize = "40px";
        keyWord.style.lineHeight = "0px";
        break;
      case 3:
        keyWord.style.fontFamily = "DM Sans, sans-serif";
        keyWord.style.fontSize = "60px";
        break;
    }
  }
  // carousel.js
  const wrap = document.querySelector("#carWrap");
  const imgTop = document.querySelector("#imgTop");
  const imgBottom = document.querySelector("#imgBottom");
  const chairCanvas = document.querySelector("#chairCanvas");

  const chair = createChairAnimator({
    canvas: chairCanvas,
    wrap,
    imgTop,
    imgBottom,
    folder: "frames",
    count: 20,
    ext: "png",
    durationMs: 1000,
  });

  // 3 etapas (pares de imágenes)
  const stages = [
    { top: "img/img-1.png", bottom: "img/img-2.png" },
    { top: "img/img-2.png", bottom: "img/img-1.png" },
    { top: "img/img-1.png", bottom: "img/img-2.png" },
  ];

  let i = 0;

  // helper: para que el offset se adapte al contenedor
  function getOffsets() {
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    return {
      xInRight: w + 60, // entra desde derecha
      xInLeft: -(w + 60), // entra desde izquierda
      yOutDown: h + 60, // sale hacia abajo
      yOutUp: -(h + 60), // sale hacia arriba
    };
  }

  function createChairAnimator(opts) {
    const canvas = opts.canvas;
    const wrap = opts.wrap;
    const folder = opts.folder || "frames";
    const count = opts.count || 20;
    const ext = opts.ext || "png";
    const durationMs = opts.durationMs || 800;

    const ctx = canvas.getContext("2d", { alpha: true });
    const images = new Array(count);
    let rafId = 0;
    let ready = false;
    const lastIndex = count + (~1 + 1);

    function pad4(n) {
      return String(n).padStart(4, "0");
    }

    function frameUrl(frameNumber) {
      return `${folder}/${pad4(frameNumber)}.${ext}`;
    }

    function setLayerStyles() {
      if (getComputedStyle(wrap).position === "static") {
        wrap.style.position = "relative";
      }

      canvas.style.position = "absolute";
      canvas.style.left = "0";
      canvas.style.top = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.zIndex = "2";
      canvas.style.pointerEvents = "none";
      canvas.style.display = "block";
    }

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const w = Math.max(1, wrap.clientWidth);
      const h = Math.max(1, wrap.clientHeight);

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      if (ready) drawFrame(0);
    }

    function drawFrame(idx) {
      const w = Math.max(1, wrap.clientWidth);
      const h = Math.max(1, wrap.clientHeight);

      ctx.clearRect(0, 0, w, h);

      const img = images[idx];
      if (!img) return;

      const iw = img.naturalWidth || 1;
      const ih = img.naturalHeight || 1;

      const scale = Math.min(w / iw, h / ih);
      const dw = iw * scale;
      const dh = ih * scale;

      const ox = (w + dw * ~0) / 2;
      const oy = (h + dh * ~0) / 2;

      ctx.drawImage(img, ox, oy, dw, dh);
    }

    function stop() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    }

    function play() {
      if (!ready) return;
      stop();

      const start = performance.now() | 0;

      function tick() {
        const now = performance.now() | 0;
        const elapsed = now + (~start + 1);

        let p = elapsed / durationMs;
        if (p > 1) p = 1;

        const idx = Math.floor(p * lastIndex);
        drawFrame(idx);

        if (p < 1) rafId = requestAnimationFrame(tick);
      }

      rafId = requestAnimationFrame(tick);
    }

    function preload() {
      setLayerStyles();
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      const loaders = [];
      for (let k = 0; k < count; k += 1) {
        const img = new Image();
        images[k] = img;

        const frameNumber = k + 1;
        loaders.push(
          new Promise((resolve) => {
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = frameUrl(frameNumber);
          }),
        );
      }

      return Promise.all(loaders).then(() => {
        ready = true;
        drawFrame(0);
        return true;
      });
    }

    return { preload, play, stop, resizeCanvas };
  }

  function goNext() {
    const next = (i + 1) % stages.length;
    const o = getOffsets();

    const tl = gsap.timeline({
      defaults: { duration: 0.3, ease: "power2.inOut" },
      onComplete: () => {
        i = next;
        gsap.delayedCall(2, goNext); // cada 2s
      },
    });
    tl.add(() => chair.play(), 0);

    // 1) SALIDA (simultánea)
    tl.to(imgTop, { y: 100, opacity: 0 }, 0)
      .to(imgBottom, { y: -100, opacity: 0 }, 0)

      // 2) Cambiar imágenes + preparar posición de ENTRADA
      .add(() => {
        imgTop.src = stages[next].top;
        imgBottom.src = stages[next].bottom;

        gsap.set(imgTop, { x: -100, y: 0, opacity: 0 });
        gsap.set(imgBottom, { x: 100, y: 0, opacity: 0 });
      })

      // 3) ENTRADA (simultánea)
      .to(imgTop, { x: 0, opacity: 1 })
      .to(imgBottom, { x: 0, opacity: 1 }, "<")

      // 4) limpiar transforms acumulados (opcional)
      .set([imgTop, imgBottom], { clearProps: "transform" });
  }

  // arrancar el loop
  chair.preload().then(() => {
    gsap.delayedCall(2, goNext);
  });
});
