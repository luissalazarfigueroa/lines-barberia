const fs = require('fs');

const htmlPath = 'c:/Users/Luis/Desktop/Lines/lines-core/index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

const opt2Start = htmlContent.indexOf('<!-- ═══════════════════════ TESTIMONIOS (OPCIÓN 2: GRILLA ASIMÉTRICA) ═══════════════════════ -->');
const opt3End = htmlContent.indexOf('</section>', htmlContent.indexOf('id="testimonios-opcion-3"')) + 10;

if (opt2Start !== -1 && opt3End !== -1) {
    // Remove Options 2 and 3
    htmlContent = htmlContent.substring(0, opt2Start) + htmlContent.substring(opt3End);
}

// Rename Option 1 ID
htmlContent = htmlContent.replace('id="testimonios-opcion-1"', 'id="testimonios"');

// Clean up the text "Opción 1: Marquee Infinito"
htmlContent = htmlContent.replace('Opción 1: Marquee Infinito', 'Testimonios');

fs.writeFileSync(htmlPath, htmlContent);
console.log("Options 2 and 3 removed. Option 1 finalized.");
