const fs = require('fs');

const cssPath = 'c:/Users/Luis/Desktop/Lines/lines-core/style.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const optionsCSS = `
/* ─── TESTIMONIOS: OPCIONES BRUTALISTAS ────────────────────────────────── */

/* OPCIÓN 1: Marquee Infinito */
.testi-marquee-container {
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: stretch;
  border-top: var(--brutalist-border);
  border-bottom: var(--brutalist-border);
  background: var(--color-bg-light);
}
.testi-marquee-track {
  display: inline-flex;
  animation: marquee-scroll 30s linear infinite;
}
.testi-marquee-track:hover {
  animation-play-state: paused;
}
.testi-marquee-card {
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  width: clamp(300px, 40vw, 500px);
  padding: var(--space-lg);
  border-right: var(--brutalist-border);
  white-space: normal;
  transition: all 0.3s ease;
  background: var(--color-bg-beige);
}
.testi-marquee-card:hover {
  background: var(--color-bg-dark);
  color: var(--light-color);
}
.testi-marquee-quote {
  font-family: var(--font-bold);
  font-size: clamp(3rem, 5vw, 5rem);
  color: var(--color-accent);
  line-height: 0.5;
  margin-bottom: 1rem;
}
.testi-marquee-text {
  font-size: var(--fs-md);
  font-family: var(--font-bold);
  line-height: 1.2;
  margin-bottom: 2rem;
}
@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* OPCIÓN 2: Grilla Asimétrica Tipo Póster */
.testi-poster-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0;
  border-top: var(--brutalist-border);
  border-left: var(--brutalist-border);
}
.testi-poster-card {
  padding: var(--space-lg);
  border-bottom: var(--brutalist-border);
  border-right: var(--brutalist-border);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.testi-poster-card.span-8 { grid-column: span 12; }
.testi-poster-card.span-4 { grid-column: span 12; }
.testi-poster-card.span-6 { grid-column: span 12; }
@media (min-width: 992px) {
  .testi-poster-card.span-8 { grid-column: span 8; }
  .testi-poster-card.span-4 { grid-column: span 4; }
  .testi-poster-card.span-6 { grid-column: span 6; }
}
.testi-poster-card.theme-dark { background: var(--color-bg-dark); color: var(--light-color); }
.testi-poster-card.theme-red { background: var(--color-accent); color: var(--light-color); }
.testi-poster-card.theme-beige { background: var(--color-bg-beige); color: var(--color-bg-dark); }
.testi-poster-text {
  font-size: var(--fs-md);
  font-family: var(--font-bold);
  line-height: 1.1;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

/* OPCIÓN 3: Carrusel Tipográfico */
.testi-carousel-container {
  border-top: var(--brutalist-border);
  border-bottom: var(--brutalist-border);
  background: var(--color-bg-light);
}
.testi-carousel-slide {
  padding: clamp(60px, 8vw, 120px) var(--margin-factor);
  display: none;
}
.testi-carousel-slide.active {
  display: block;
  animation: fade-in 0.5s ease;
}
.testi-carousel-text {
  font-size: var(--fs-xl);
  font-family: var(--font-bold);
  line-height: 1;
  text-transform: uppercase;
  margin-bottom: 3rem;
  max-width: 90%;
}
.testi-carousel-nav {
  display: flex;
  border-top: var(--brutalist-border);
}
.testi-carousel-btn {
  flex: 1;
  padding: var(--space-md);
  background: var(--color-bg-beige);
  border: none;
  border-right: var(--brutalist-border);
  font-family: var(--font-bold);
  font-size: var(--fs-lg);
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
}
.testi-carousel-btn:last-child {
  border-right: none;
}
.testi-carousel-btn:hover {
  background: var(--color-accent);
  color: var(--light-color);
}
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

if (!cssContent.includes('OPCIONES BRUTALISTAS')) {
    cssContent += optionsCSS;
    fs.writeFileSync(cssPath, cssContent);
}

const htmlPath = 'c:/Users/Luis/Desktop/Lines/lines-core/index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

const startStr = '<!-- ═══════════════════════ TESTIMONIOS ═══════════════════════ -->';
const startIndex = htmlContent.indexOf(startStr);
const endStr = '</section>';
let endIndex = htmlContent.indexOf(endStr, startIndex);
if (endIndex !== -1) {
    endIndex += endStr.length;
} else {
    console.log("Could not find section end");
    process.exit(1);
}

const newHTML = `<!-- ═══════════════════════ TESTIMONIOS (OPCIÓN 1: MARQUEE) ═══════════════════════ -->
        <section id="testimonios-opcion-1" class="brutal-section brutal-section-p0 bg-beige pt-xl pb-xl border-bottom-hard">
          <div class="px-margin mb-xl">
            <h2 class="text-uppercase m-0">Opción 1: Marquee Infinito</h2>
            <p class="section-label text-dark opacity-50 mt-3">Dinámico, continuo, moderno.</p>
          </div>
          
          <div class="testi-marquee-container">
            <div class="testi-marquee-track">
              <!-- Duplicate contents to ensure seamless scroll -->
              <div class="testi-marquee-card">
                <div>
                  <div class="testi-marquee-quote">"</div>
                  <p class="testi-marquee-text">Llevo tres años yendo a Lines y nunca me han fallado. El ambiente y el resultado siempre son top.</p>
                </div>
                <div class="d-flex align-items-center gap-3">
                  <img class="testi-avatar-bento" src="img/profile-1.jpg" alt="Cliente" style="width:50px; height:50px; border-radius:50%; border:2px solid black; filter:grayscale(100%);">
                  <div><p class="m-0 fw-bold">Matías G.</p><p class="m-0 opacity-50" style="font-size:14px;">Hace 2 semanas</p></div>
                </div>
              </div>
              <div class="testi-marquee-card">
                <div>
                  <div class="testi-marquee-quote">"</div>
                  <p class="testi-marquee-text">El fade que me hicieron quedó perfecto. Fui por primera vez y ya tengo la próxima cita agendada.</p>
                </div>
                <div class="d-flex align-items-center gap-3">
                  <img class="testi-avatar-bento" src="img/profile-2.jpg" alt="Cliente" style="width:50px; height:50px; border-radius:50%; border:2px solid black; filter:grayscale(100%);">
                  <div><p class="m-0 fw-bold">Diego V.</p><p class="m-0 opacity-50" style="font-size:14px;">Hace 1 mes</p></div>
                </div>
              </div>
              <div class="testi-marquee-card">
                <div>
                  <div class="testi-marquee-quote">"</div>
                  <p class="testi-marquee-text">Buenísima atención. Te asesoran sobre qué corte te viene mejor según tu tipo de pelo. Muy pros.</p>
                </div>
                <div class="d-flex align-items-center gap-3">
                  <img class="testi-avatar-bento" src="img/profile-3.jpg" alt="Cliente" style="width:50px; height:50px; border-radius:50%; border:2px solid black; filter:grayscale(100%);">
                  <div><p class="m-0 fw-bold">Carlos M.</p><p class="m-0 opacity-50" style="font-size:14px;">Hace 3 meses</p></div>
                </div>
              </div>
              <!-- DUPLICATE FOR SCROLL -->
              <div class="testi-marquee-card">
                <div>
                  <div class="testi-marquee-quote">"</div>
                  <p class="testi-marquee-text">Llevo tres años yendo a Lines y nunca me han fallado. El ambiente y el resultado siempre son top.</p>
                </div>
                <div class="d-flex align-items-center gap-3">
                  <img class="testi-avatar-bento" src="img/profile-1.jpg" alt="Cliente" style="width:50px; height:50px; border-radius:50%; border:2px solid black; filter:grayscale(100%);">
                  <div><p class="m-0 fw-bold">Matías G.</p><p class="m-0 opacity-50" style="font-size:14px;">Hace 2 semanas</p></div>
                </div>
              </div>
              <div class="testi-marquee-card">
                <div>
                  <div class="testi-marquee-quote">"</div>
                  <p class="testi-marquee-text">El fade que me hicieron quedó perfecto. Fui por primera vez y ya tengo la próxima cita agendada.</p>
                </div>
                <div class="d-flex align-items-center gap-3">
                  <img class="testi-avatar-bento" src="img/profile-2.jpg" alt="Cliente" style="width:50px; height:50px; border-radius:50%; border:2px solid black; filter:grayscale(100%);">
                  <div><p class="m-0 fw-bold">Diego V.</p><p class="m-0 opacity-50" style="font-size:14px;">Hace 1 mes</p></div>
                </div>
              </div>
              <div class="testi-marquee-card">
                <div>
                  <div class="testi-marquee-quote">"</div>
                  <p class="testi-marquee-text">Buenísima atención. Te asesoran sobre qué corte te viene mejor según tu tipo de pelo. Muy pros.</p>
                </div>
                <div class="d-flex align-items-center gap-3">
                  <img class="testi-avatar-bento" src="img/profile-3.jpg" alt="Cliente" style="width:50px; height:50px; border-radius:50%; border:2px solid black; filter:grayscale(100%);">
                  <div><p class="m-0 fw-bold">Carlos M.</p><p class="m-0 opacity-50" style="font-size:14px;">Hace 3 meses</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ═══════════════════════ TESTIMONIOS (OPCIÓN 2: GRILLA ASIMÉTRICA) ═══════════════════════ -->
        <section id="testimonios-opcion-2" class="brutal-section brutal-section-p0 bg-light pt-xl pb-xl border-bottom-hard">
          <div class="px-margin mb-xl">
            <h2 class="text-uppercase m-0">Opción 2: Grilla Asimétrica</h2>
            <p class="section-label text-dark opacity-50 mt-3">Pósters callejeros, caótico pero editorial.</p>
          </div>

          <div class="px-margin">
            <div class="testi-poster-grid">
              <div class="testi-poster-card span-8 theme-dark">
                <p class="testi-poster-text">"El fade que me hicieron quedó perfecto. Fui por primera vez y ya tengo la próxima cita agendada."</p>
                <p class="m-0 font-bold">— Diego Valenzuela</p>
              </div>
              <div class="testi-poster-card span-4 theme-red">
                <p class="testi-poster-text">"Buenísima atención. Te asesoran sobre qué corte te viene mejor."</p>
                <p class="m-0 font-bold">— Carlos M.</p>
              </div>
              <div class="testi-poster-card span-4 theme-beige">
                <p class="testi-poster-text">"Puntualidad increíble y el barbero captó enseguida lo que quería."</p>
                <p class="m-0 font-bold">— Felipe B.</p>
              </div>
              <div class="testi-poster-card span-8 theme-light">
                <p class="testi-poster-text">"Llevo tres años yendo a Lines y nunca me han fallado. El ambiente, la atención y el resultado siempre son top."</p>
                <p class="m-0 font-bold">— Matías González</p>
              </div>
            </div>
          </div>
        </section>

        <!-- ═══════════════════════ TESTIMONIOS (OPCIÓN 3: CARRUSEL) ═══════════════════════ -->
        <section id="testimonios-opcion-3" class="brutal-section brutal-section-p0 bg-beige pt-xl pb-xl border-bottom-hard">
          <div class="px-margin mb-xl">
            <h2 class="text-uppercase m-0">Opción 3: Carrusel Tipográfico</h2>
            <p class="section-label text-dark opacity-50 mt-3">Impacto puro, una declaración por pantalla.</p>
          </div>

          <div class="testi-carousel-container">
            <div id="slide-1" class="testi-carousel-slide active">
              <p class="testi-carousel-text">"Llevo 3 años yendo a Lines y NUNCA me han fallado. El resultado siempre es TOP."</p>
              <p class="fs-lg font-bold m-0">— Matías González</p>
            </div>
            <div id="slide-2" class="testi-carousel-slide">
              <p class="testi-carousel-text">"El fade quedó PERFECTO. Fui por primera vez y ya tengo la próxima cita."</p>
              <p class="fs-lg font-bold m-0">— Diego V.</p>
            </div>
            <div id="slide-3" class="testi-carousel-slide">
              <p class="testi-carousel-text">"TE ASESORAN sobre qué corte te viene mejor según tu pelo. Muy PROS."</p>
              <p class="fs-lg font-bold m-0">— Carlos M.</p>
            </div>
            
            <div class="testi-carousel-nav">
              <button class="testi-carousel-btn" onclick="nextSlide(-1)">Anterior</button>
              <button class="testi-carousel-btn" onclick="nextSlide(1)">Siguiente</button>
            </div>
          </div>

          <script>
            let currentSlide = 1;
            const totalSlides = 3;
            function nextSlide(dir) {
              document.getElementById('slide-' + currentSlide).classList.remove('active');
              currentSlide += dir;
              if (currentSlide > totalSlides) currentSlide = 1;
              if (currentSlide < 1) currentSlide = totalSlides;
              document.getElementById('slide-' + currentSlide).classList.add('active');
            }
          </script>
        </section>
`;

htmlContent = htmlContent.substring(0, startIndex) + newHTML + htmlContent.substring(endIndex);
fs.writeFileSync(htmlPath, htmlContent);
console.log("Done!");
