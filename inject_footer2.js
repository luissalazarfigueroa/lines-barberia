const fs = require('fs');

const htmlPath = 'c:/Users/Luis/Desktop/Lines/lines-core/index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

const startIndex = htmlContent.indexOf('<!-- ═══════════════════════ FOOTER ═══════════════════════ -->');
const endIndex = htmlContent.indexOf('</footer>', startIndex) + 9;

if (startIndex === -1 || endIndex < 9) {
    console.log("Could not find footer!");
    process.exit(1);
}

const newFooter = `<!-- 🔥 FOOTER 🔥 -->
        <footer class="brutal-footer bg-dark text-light relative overflow-hidden">
          <div class="px-margin pt-xl pb-xl">
            <div class="row g-5">
              <!-- Branding Column -->
              <div class="col-lg-4 d-flex flex-column justify-content-between">
                <div>
                  <div class="w-140px mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 711.16 114.85" style="fill: var(--light-color);">
                      <rect x="213.82" y="23.22" width="12.99" height="65.98" rx="1.49" />
                      <path d="M133.84,76.21h-25.16V24.71c0-.82-.67-1.49-1.49-1.49h-10.01c-.82,0-1.49.67-1.49,1.49v63c0,.82.67,1.49,1.49,1.49h36.66c.82,0,1.49-.67,1.49-1.49v-10.01c0-.82-.67-1.49-1.49-1.49Z" />
                      <rect y="56.56" width="36.14" height="12.99" rx="1.49" />
                      <rect x="675.02" y="56.56" width="36.14" height="12.99" rx="1.49" />
                      <path d="M489.55,23.22h-36.66c-.82,0-1.49.67-1.49,1.49v63c0,.82.67,1.49,1.49,1.49h36.66c.82,0,1.49-.67,1.49-1.49v-10.01c0-.82-.67-1.49-1.49-1.49h-25.16v-13.18h20.44c.44,0,.8-.36.8-.8v-11.4c0-.44-.36-.8-.8-.8h-20.44v-13.83h25.16c.82,0,1.49-.67,1.49-1.49v-10.01c0-.82-.67-1.49-1.49-1.49Z" />
                      <path d="M381.06,0l-53.55,64.44c-.38.45-1.11.19-1.11-.4V11.76c0-.82-.67-1.49-1.49-1.49h-16.05c-.82,0-1.49.67-1.49,1.49v101.98c0,1.03,1.29,1.5,1.95.7l51.62-62.12c.38-.45,1.11-.19,1.11.4v52.66c0,.82.67,1.49,1.49,1.49h16.05c.82,0,1.49-.67,1.49-1.49V0Z" />
                      <path d="M584.77,40.31c0-3.84,4.21-7.15,9.55-7.15,4.79,0,7.22,2.09,9.61,4.26.42.38,1.07.34,1.44-.09l6.48-7.49c.36-.42.31-1.03-.09-1.41-3.08-2.83-7.59-7.85-18.09-7.85-12.43,0-21.75,9.98-21.75,19.96,0,18.25,30.45,20.41,30.45,31.63,0,5.2-5.71,7.36-11.07,7.36-4.96,0-10.01-3.05-13.42-6.15-.44-.4-1.1-.35-1.47.11l-6.52,8.29c-.32.41-.29.99.1,1.35,2.87,2.67,9.57,8.86,21.81,8.86,8.47,0,23.3-4.43,23.3-19.88,0-19.9-30.33-22.68-30.33-31.81Z" />
                    </svg>
                  </div>
                  <p class="section-label text-beige opacity-50">/ La experiencia de un buen corte</p>
                </div>
                <div class="mt-5 mt-lg-0">
                  <p class="mb-2 opacity-50 text-uppercase" style="letter-spacing: 2px;">Dirección</p>
                  <p class="fs-lg text-uppercase fw-bold m-0" style="color: var(--light-color);">Av. Ossa 2176, Local 3</p>
                  <p class="fs-md text-uppercase mt-2 opacity-80">+56 9 1234 5678</p>
                </div>
              </div>

              <!-- Links Columns -->
              <div class="col-6 col-lg-3 offset-lg-1">
                <p class="section-label text-beige mb-4 opacity-50">/ Navegación</p>
                <ul class="brutal-footer-links list-unstyled">
                  <li><a href="#nosotros">Nosotros</a></li>
                  <li><a href="#barberos">Barberos</a></li>
                  <li><a href="#servicios">Servicios</a></li>
                  <li><a href="#galeria">Galería</a></li>
                  <li><a href="#agenda">Agenda</a></li>
                </ul>
              </div>

              <div class="col-6 col-lg-2">
                <p class="section-label text-beige mb-4 opacity-50">/ Contenido</p>
                <ul class="brutal-footer-links list-unstyled">
                  <li><a href="blog/index.html">Blog</a></li>
                  <li><a href="blog/index.html#tecnica">Técnica</a></li>
                  <li><a href="blog/index.html#productos">Productos</a></li>
                  <li><a href="blog/index.html#tendencias">Tendencias</a></li>
                </ul>
              </div>

              <div class="col-12 col-lg-1 d-flex align-items-end justify-content-lg-end mt-4 mt-lg-0">
                 <!-- Instagram Button -->
                 <a href="https://instagram.com/linesbarberia" target="_blank" class="btn btn-lines ig-circle-btn reveal-up">
                   <svg viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                   </svg>
                   <span style="font-size: 12px; font-weight: bold;">IG</span>
                 </a>
              </div>
            </div>
          </div>

          <!-- Mega Text -->
          <div class="footer-mega-text border-top-hard" style="border-color: rgba(255,255,255,0.1) !important;">
            LINES
          </div>

          <!-- Bottom Bar -->
          <div class="px-margin py-3 d-flex flex-column flex-md-row justify-content-between border-top-hard" style="border-color: rgba(255,255,255,0.1) !important; font-size: var(--fs-sm); opacity: 0.5;">
            <span class="mb-2 mb-md-0">© 2025 Lines Barbería. Todos los derechos reservados.</span>
            <a href="politica-de-privacidad.html" class="text-light text-decoration-none hover-underline">Política de privacidad</a>
          </div>
        </footer>`;

htmlContent = htmlContent.substring(0, startIndex) + newFooter + htmlContent.substring(endIndex);
fs.writeFileSync(htmlPath, htmlContent);
console.log("Footer injected!");
