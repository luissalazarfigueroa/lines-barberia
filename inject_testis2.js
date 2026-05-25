const fs = require('fs');

const htmlPath = 'c:/Users/Luis/Desktop/Lines/lines-core/index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

const startIndex = htmlContent.indexOf('<section id="testimonios"');
const endStr = '</section>';
let endIndex = htmlContent.indexOf(endStr, startIndex);

if (startIndex === -1 || endIndex === -1) {
    console.log("Could not find testimonios section!");
    process.exit(1);
}
endIndex += endStr.length;

// If there's an HTML comment before it, remove it
let trueStartIndex = startIndex;
const commentIndex = htmlContent.lastIndexOf('<!--', startIndex);
if (commentIndex !== -1 && startIndex - commentIndex < 50) {
    trueStartIndex = commentIndex;
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
                <p class="m-0 fw-bold">— Diego Valenzuela</p>
              </div>
              <div class="testi-poster-card span-4 theme-red">
                <p class="testi-poster-text">"Buenísima atención. Te asesoran sobre qué corte te viene mejor."</p>
                <p class="m-0 fw-bold">— Carlos M.</p>
              </div>
              <div class="testi-poster-card span-4 theme-beige">
                <p class="testi-poster-text">"Puntualidad increíble y el barbero captó enseguida lo que quería."</p>
                <p class="m-0 fw-bold">— Felipe B.</p>
              </div>
              <div class="testi-poster-card span-8 theme-light">
                <p class="testi-poster-text">"Llevo tres años yendo a Lines y nunca me han fallado. El ambiente, la atención y el resultado siempre son top."</p>
                <p class="m-0 fw-bold">— Matías González</p>
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
              <p class="fs-lg fw-bold m-0">— Matías González</p>
            </div>
            <div id="slide-2" class="testi-carousel-slide">
              <p class="testi-carousel-text">"El fade quedó PERFECTO. Fui por primera vez y ya tengo la próxima cita."</p>
              <p class="fs-lg fw-bold m-0">— Diego V.</p>
            </div>
            <div id="slide-3" class="testi-carousel-slide">
              <p class="testi-carousel-text">"TE ASESORAN sobre qué corte te viene mejor según tu pelo. Muy PROS."</p>
              <p class="fs-lg fw-bold m-0">— Carlos M.</p>
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

htmlContent = htmlContent.substring(0, trueStartIndex) + newHTML + htmlContent.substring(endIndex);
fs.writeFileSync(htmlPath, htmlContent);
console.log("Testimonios injected correctly!");
