const fs = require('fs');

const htmlPath = 'c:/Users/Luis/Desktop/Lines/lines-core/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Rebuild "Nosotros" (About)
// We will make it brutalist
const nosotrosOld = /<section id="nosotros"[\s\S]*?<\/section>/;
const nosotrosNew = `
        <section id="nosotros" class="brutal-section brutal-section-p0 bg-dark pt-xl pb-xl border-bottom-hard">
          <div class="px-margin">
            <div class="row align-items-center">
              <div class="col-lg-6">
                <p class="section-label text-beige opacity-50 m-0 mb-4">/ Identidad</p>
                <h2 class="text-uppercase m-0 text-light mb-5" style="font-size: clamp(3rem, 6vw, 6rem); line-height: 1;">No seguimos<br>tendencias.<br>Las dictamos.</h2>
                <p class="text-light opacity-80" style="font-size: var(--fs-md); max-width: 500px; margin-bottom: 2rem;">Lines Barbería nació en 2018 con una premisa simple: la técnica cruda por encima del adorno. Somos artesanos del cabello, enfocados en el contraste, la textura y la precisión milimétrica.</p>
                <a href="#agenda" class="btn btn-lines-dark">Conoce nuestra historia</a>
              </div>
              <div class="col-lg-6 mt-5 mt-lg-0">
                <div style="border: 2px solid var(--color-bg-light); padding: 10px; background: var(--color-bg-light);">
                  <img src="img/bg-2.jpg" class="w-100" style="filter: grayscale(100%) contrast(1.2);" alt="Nosotros">
                </div>
              </div>
            </div>
          </div>
        </section>
`;
html = html.replace(nosotrosOld, nosotrosNew.trim());

// 2. Rebuild "Productos" and "Cursos" (Replacing "Servicios")
const serviciosOld = /<section id="servicios"[\s\S]*?<\/section>/;
const productosCursosNew = `
        <!-- ═══════════════════════ PRODUCTOS ═══════════════════════ -->
        <section id="productos" class="brutal-section brutal-section-p0 bg-light pt-xl pb-xl border-bottom-hard">
          <div class="px-margin mb-xl">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end">
              <div>
                <p class="section-label text-dark opacity-50 m-0 mb-3">/ Arsenal</p>
                <h2 class="text-uppercase m-0" style="font-size: clamp(3rem, 5vw, 5rem);">Productos</h2>
              </div>
              <a href="#" class="btn btn-lines mt-4 mt-md-0">Ver catálogo completo</a>
            </div>
          </div>

          <div class="px-margin">
            <div class="row g-0 border-top-hard border-left-hard">
              <!-- Producto 1 -->
              <div class="col-md-3 col-6 border-right-hard border-bottom-hard p-4" style="background: var(--color-bg-beige);">
                <img src="img/aceite.png" class="w-100 mb-4" style="mix-blend-mode: multiply;" alt="Aceite para barba">
                <h3 class="text-uppercase" style="font-size: var(--fs-sm); margin-bottom: 0.5rem;">Aceite de Barba</h3>
                <p class="opacity-50 m-0" style="font-size: 14px;">$15.000</p>
              </div>
              <!-- Producto 2 -->
              <div class="col-md-3 col-6 border-right-hard border-bottom-hard p-4" style="background: var(--color-bg-light);">
                <img src="img/cera.png" class="w-100 mb-4" style="mix-blend-mode: multiply;" alt="Cera Modeladora">
                <h3 class="text-uppercase" style="font-size: var(--fs-sm); margin-bottom: 0.5rem;">Cera Modeladora</h3>
                <p class="opacity-50 m-0" style="font-size: 14px;">$12.500</p>
              </div>
              <!-- Producto 3 -->
              <div class="col-md-3 col-6 border-right-hard border-bottom-hard p-4" style="background: var(--color-bg-beige);">
                <img src="img/shampoo.png" class="w-100 mb-4" style="mix-blend-mode: multiply;" alt="Shampoo">
                <h3 class="text-uppercase" style="font-size: var(--fs-sm); margin-bottom: 0.5rem;">Shampoo Barbería</h3>
                <p class="opacity-50 m-0" style="font-size: 14px;">$18.000</p>
              </div>
              <!-- Producto 4 -->
              <div class="col-md-3 col-6 border-right-hard border-bottom-hard p-4" style="background: var(--color-bg-light);">
                <img src="img/locion.png" class="w-100 mb-4" style="mix-blend-mode: multiply;" alt="Loción">
                <h3 class="text-uppercase" style="font-size: var(--fs-sm); margin-bottom: 0.5rem;">Loción Afeitado</h3>
                <p class="opacity-50 m-0" style="font-size: 14px;">$20.000</p>
              </div>
            </div>
          </div>
        </section>

        <!-- ═══════════════════════ CURSOS ═══════════════════════ -->
        <section id="cursos" class="brutal-section brutal-section-p0 bg-beige pt-xl pb-xl border-bottom-hard">
          <div class="px-margin">
            <div class="row align-items-center">
              <div class="col-lg-7">
                <p class="section-label text-dark opacity-50 m-0 mb-4">/ Academia</p>
                <h2 class="text-uppercase m-0 mb-5" style="font-size: clamp(3rem, 5vw, 5rem); line-height: 1;">Aprende<br>la técnica<br><span style="color: var(--color-accent);">Lines.</span></h2>
                <div class="d-flex flex-column gap-3 mb-5" style="max-width: 500px;">
                  <div class="d-flex justify-content-between border-bottom-hard pb-2">
                    <span class="text-uppercase fw-bold">Fade Avanzado</span>
                    <span>12 Hrs</span>
                  </div>
                  <div class="d-flex justify-content-between border-bottom-hard pb-2">
                    <span class="text-uppercase fw-bold">Tijera y Textura</span>
                    <span>16 Hrs</span>
                  </div>
                  <div class="d-flex justify-content-between border-bottom-hard pb-2">
                    <span class="text-uppercase fw-bold">Gestión de Barbería</span>
                    <span>8 Hrs</span>
                  </div>
                </div>
                <a href="#agenda" class="btn btn-lines">Inscríbete ahora</a>
              </div>
              <div class="col-lg-5 mt-5 mt-lg-0">
                <div style="background: var(--color-accent); padding: var(--space-lg); border: 2px solid black; transform: rotate(2deg);">
                  <h3 class="text-light text-uppercase m-0 mb-3" style="font-size: var(--fs-lg);">Cupos<br>Limitados</h3>
                  <p class="text-light m-0">Próxima fecha: 15 de Octubre.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
`;
html = html.replace(serviciosOld, productosCursosNew.trim());

// 3. Rebuild "Barberos"
const barberosOld = /<section id="barberos"[\s\S]*?<\/section>/;
const barberosNew = `
        <section id="barberos" class="brutal-section brutal-section-p0 bg-dark pt-xl pb-xl border-bottom-hard text-light">
          <div class="px-margin mb-xl">
            <p class="section-label text-beige opacity-50 m-0 mb-3">/ El Equipo</p>
            <h2 class="text-uppercase m-0" style="font-size: clamp(3rem, 5vw, 5rem);">Nuestros Barberos</h2>
          </div>
          <div class="px-margin">
            <div class="row g-0 border-top-hard border-left-hard" style="border-color: rgba(255,255,255,0.1) !important;">
              <div class="col-md-4 border-right-hard border-bottom-hard p-4" style="border-color: rgba(255,255,255,0.1) !important;">
                <img src="img/barbero-1.jpg" class="w-100 mb-4" style="filter: grayscale(100%); border: 1px solid rgba(255,255,255,0.2);" alt="Luis">
                <h3 class="text-uppercase mb-1" style="font-size: var(--fs-md);">Luis</h3>
                <p class="opacity-50 m-0" style="font-size: 14px;">Master Barber / Fundador</p>
              </div>
              <div class="col-md-4 border-right-hard border-bottom-hard p-4" style="border-color: rgba(255,255,255,0.1) !important;">
                <img src="img/barbero-2.jpg" class="w-100 mb-4" style="filter: grayscale(100%); border: 1px solid rgba(255,255,255,0.2);" alt="Pedro">
                <h3 class="text-uppercase mb-1" style="font-size: var(--fs-md);">Pedro</h3>
                <p class="opacity-50 m-0" style="font-size: 14px;">Especialista en Fades</p>
              </div>
              <div class="col-md-4 border-right-hard border-bottom-hard p-4" style="border-color: rgba(255,255,255,0.1) !important;">
                <img src="img/barbero-3.jpg" class="w-100 mb-4" style="filter: grayscale(100%); border: 1px solid rgba(255,255,255,0.2);" alt="Javier">
                <h3 class="text-uppercase mb-1" style="font-size: var(--fs-md);">Javier</h3>
                <p class="opacity-50 m-0" style="font-size: 14px;">Tijera y Textura</p>
              </div>
            </div>
          </div>
        </section>
`;
html = html.replace(barberosOld, barberosNew.trim());

// Fix link in footer for educacion instead of blog
html = html.replace(/href="blog\/index\.html"/g, 'href="#cursos"');

fs.writeFileSync(htmlPath, html);
console.log("Sections rebuilt perfectly!");
