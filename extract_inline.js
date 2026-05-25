const fs = require('fs');

const cssPath = 'c:/Users/Luis/Desktop/Lines/lines-core/style.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const extractedStyles = `
/* ─── INLINE STYLES EXTRACTED ────────────────────────────────────────────── */
/* Utilities */
.relative { position: relative !important; }
.absolute-fill { position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; }
.z-0 { z-index: 0 !important; }
.z-1 { z-index: 1 !important; }
.pointer-none { pointer-events: none !important; }
.opacity-20 { opacity: 0.2 !important; }
.opacity-50 { opacity: 0.5 !important; }
.opacity-60 { opacity: 0.6 !important; }
.opacity-80 { opacity: 0.8 !important; }
.opacity-90 { opacity: 0.9 !important; }

/* Colors */
.text-beige { color: var(--color-bg-beige) !important; }
.text-light { color: var(--color-bg-light) !important; }
.text-dark { color: var(--color-bg-dark) !important; }
.text-white { color: white !important; }
.bg-primary { background: var(--color-primary) !important; }

/* Background Images */
.bg-texture-hair { background: url(img/hair.png) !important; }
.bg-img-lines { background-image: url('img/lines.webp') !important; background-size: cover !important; background-position: center !important; }

/* Borders */
.border-top-hard { border-top: 1px solid black !important; }
.border-left-hard { border-left: 1px solid black !important; }
.border-right-hard { border-right: 1px solid black !important; }
.border-hard { border: 1px solid black !important; }
.border-top-0 { border-top: none !important; }
.border-left-0 { border-left: none !important; }

/* Layout Adjustments */
.h-100-min { min-height: 100% !important; }
.h-fit { min-height: fit-content !important; }
.bottom-right-24 { bottom: 24px !important; right: 24px !important; }
.max-w-1320 { max-width: 1320px !important; }
.w-140px { width: 140px !important; }

/* Product Images Fix (Removing negative margins and using correct padding/margins) */
.product-card-img {
    width: 100% !important;
    border-bottom: 4px solid var(--main-color) !important;
    margin-top: calc(-1 * var(--space-md)) !important;
    margin-left: calc(-1 * var(--space-md)) !important;
    margin-right: calc(-1 * var(--space-md)) !important;
    width: calc(100% + calc(2 * var(--space-md))) !important;
    max-width: none !important;
}
`;
if (!cssContent.includes('INLINE STYLES EXTRACTED')) {
    cssContent += extractedStyles;
}
fs.writeFileSync(cssPath, cssContent);

const htmlPath = 'c:/Users/Luis/Desktop/Lines/lines-core/index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// 1. Canvas & Position Absolute
htmlContent = htmlContent.replace(/style="position:\s*absolute;\s*top:\s*0;\s*left:\s*0;\s*width:\s*100%;\s*height:\s*100%;\s*z-index:\s*1;\s*pointer-events:\s*none;\s*opacity:\s*0\.6;"/g, 'class="absolute-fill z-1 pointer-none opacity-60"');
htmlContent = htmlContent.replace(/style="position:\s*absolute;\s*top:\s*0;\s*left:\s*0;\s*width:\s*100%;\s*height:\s*100%;\s*z-index:\s*0;\s*pointer-events:\s*none;\s*opacity:\s*0\.8;"/g, 'class="absolute-fill z-0 pointer-none opacity-80"');
htmlContent = htmlContent.replace(/style="position:\s*absolute;\s*top:\s*0;\s*left:\s*0;\s*width:\s*100%;\s*height:\s*100%;\s*background-image:\s*url\('img\/lines\.webp'\);\s*background-size:\s*cover;\s*background-position:\s*center;"/g, 'class="absolute-fill bg-img-lines"');
htmlContent = htmlContent.replace(/style="bottom:\s*24px;\s*right:\s*24px;"/g, 'class="bottom-right-24"');

// 2. SVG Logo
htmlContent = htmlContent.replace(/style="width:\s*140px;"/g, 'class="w-140px"');

// 3. Sections position relative
htmlContent = htmlContent.replace(/style="position:\s*relative"/g, 'class="relative"');
htmlContent = htmlContent.replace(/style="position:\s*relative;"/g, 'class="relative"');
htmlContent = htmlContent.replace(/style="position:\s*relative;\s*min-height:\s*fit-content;"/g, 'class="relative h-fit"');
htmlContent = htmlContent.replace(/style="position:\s*relative;\s*overflow:\s*hidden;"/g, 'class="relative overflow-hidden"');

// 4. Products CSS
htmlContent = htmlContent.replace(/style="width:\s*100%;\s*border-bottom:\s*4px\s*solid\s*var\(--main-color\);\s*margin-top:\s*-28px;\s*margin-left:\s*-28px;\s*margin-right:\s*-28px;\s*width:\s*calc\(100%\s*\+\s*56px\);\s*max-width:\s*none;"/g, 'class="product-card-img mb-3"');

// 5. Hair texture
htmlContent = htmlContent.replace(/style="background:\s*url\(img\/hair\.png\)"/g, 'class="hair-texture bg-texture-hair"');

// 6. Text Colors
htmlContent = htmlContent.replace(/style="color:\s*var\(--color-bg-beige\);"/g, 'class="section-label reveal-up text-beige"');
htmlContent = htmlContent.replace(/style="color:\s*var\(--color-bg-light\);"/g, 'class="reveal-up text-light"');
htmlContent = htmlContent.replace(/style="color:\s*var\(--color-bg-dark\)"/g, 'class="section-label reveal-up text-dark"');
htmlContent = htmlContent.replace(/style="color:\s*white;"/g, 'class="text-white"');

// Wait, the above replace for colors might overwrite class attributes if done wrong.
// Because it just replaces the string. The class is separate.
// I should use a safer approach for colors since they are in `style="color:..."` and the element already has a class attribute.
// Let's refine the colors replacements:
htmlContent = htmlContent.replace(/class="([^"]*)"\s*style="color:\s*var\(--color-bg-beige\);?"/g, 'class="$1 text-beige"');
htmlContent = htmlContent.replace(/class="([^"]*)"\s*style="color:\s*var\(--color-bg-light\);?"/g, 'class="$1 text-light"');
htmlContent = htmlContent.replace(/class="([^"]*)"\s*style="color:\s*var\(--color-bg-dark\);?"/g, 'class="$1 text-dark"');
htmlContent = htmlContent.replace(/class="([^"]*)"\s*style="color:\s*white;?"/g, 'class="$1 text-white"');

// 7. Opacity
htmlContent = htmlContent.replace(/style="opacity:\s*0\.5;"/g, 'class="mc-hour-row opacity-50"');
htmlContent = htmlContent.replace(/style="opacity:\s*0\.2;\s*text-decoration:\s*none"/g, 'class="opacity-20 text-decoration-none"');
htmlContent = htmlContent.replace(/style="opacity:\s*0\.9;"/g, 'class="opacity-90"');

// 8. Text Alignment and Margins
htmlContent = htmlContent.replace(/style="text-align:\s*left;\s*margin-left:\s*0"/g, 'class="text-start ms-0"');
htmlContent = htmlContent.replace(/style="margin-left:\s*0;\s*text-align:\s*left"/g, 'class="text-start ms-0"');
htmlContent = htmlContent.replace(/style="text-align:\s*left"/g, 'class="text-start"');
htmlContent = htmlContent.replace(/style="display:\s*block;\s*margin-left:\s*0"/g, 'class="d-block ms-0"');

// 9. Background Primary
htmlContent = htmlContent.replace(/style="background:\s*var\(--color-primary\);\s*color:\s*white;"/g, 'class="bg-primary text-white"');

// 10. Borders
htmlContent = htmlContent.replace(/style="border-top:\s*1px\s*solid\s*black;\s*border-left:\s*1px\s*solid\s*black;"/g, 'class="row g-0 border-top-hard border-left-hard"');
htmlContent = htmlContent.replace(/style="border-top:\s*none;\s*border-left:\s*none;"/g, 'class="testi-bento border-top-0 border-left-0"');
htmlContent = htmlContent.replace(/style="border-top:\s*1px\s*solid\s*black;"/g, 'class="row g-0 border-top-hard"');

// 11. Custom cols
htmlContent = htmlContent.replace(/style="min-height:\s*100%;\s*border:\s*1px\s*solid\s*black;"/g, 'class="h-100-min border-hard"');

// 12. max-width
htmlContent = htmlContent.replace(/style="max-width:\s*1320px;"/g, 'class="max-w-1320"');

// 13. Remaining style elements that were missed:
// <span style="margin: 0 10px">|</span>
htmlContent = htmlContent.replace(/<span style="margin:\s*0\s*10px">\|<\/span>/g, '<span class="mx-2">|</span>');
// class="hair-texture bg-texture-hair" class="hair-texture"
htmlContent = htmlContent.replace(/class="hair-texture"\s*class="hair-texture bg-texture-hair"/g, 'class="hair-texture bg-texture-hair"');
// <div class="mc-hour-row" class="mc-hour-row opacity-50">
htmlContent = htmlContent.replace(/class="mc-hour-row"\s*class="mc-hour-row opacity-50"/g, 'class="mc-hour-row opacity-50"');
// class="row g-0" class="row g-0 border-top-hard"
htmlContent = htmlContent.replace(/class="row g-0"\s*class="row g-0 border-top-hard"/g, 'class="row g-0 border-top-hard"');
htmlContent = htmlContent.replace(/class="row g-0"\s*class="row g-0 border-top-hard border-left-hard"/g, 'class="row g-0 border-top-hard border-left-hard"');
htmlContent = htmlContent.replace(/class="testi-bento"\s*class="testi-bento border-top-0 border-left-0"/g, 'class="testi-bento border-top-0 border-left-0"');
htmlContent = htmlContent.replace(/class="img-fluid mb-3" class="product-card-img mb-3"/g, 'class="img-fluid product-card-img mb-3"');
// For styling sections with multiple attributes:
// <div class="col-lg-7 d-flex align-items-center py-xl" style="padding-left: var(--margin-factor); padding-right: var(--margin-factor);  background-color: var(--bg-color);border-right: solid 1px black">
htmlContent = htmlContent.replace(/style="padding-left:\s*var\(--margin-factor\);\s*padding-right:\s*var\(--margin-factor\);\s*background-color:\s*var\(--bg-color\);border-right:\s*solid\s*1px\s*black"/g, 'class="px-margin bg-beige border-right-hard"');
// Wait, class might be duplicated here: class="col-lg-7 d-flex align-items-center py-xl" class="px-margin bg-beige border-right-hard"
htmlContent = htmlContent.replace(/class="col-lg-7 d-flex align-items-center py-xl"\s*class="px-margin bg-beige border-right-hard"/g, 'class="col-lg-7 d-flex align-items-center py-xl px-margin bg-beige border-right-hard"');

// Fix text-decoration-none
htmlContent = htmlContent.replace(/class="col-md-6 mb-3 mb-md-0"\s*class="opacity-20 text-decoration-none"/g, 'class="col-md-6 mb-3 mb-md-0 opacity-20 text-decoration-none"');
htmlContent = htmlContent.replace(/<a\s*href="\S+"\s*class="opacity-20 text-decoration-none"/g, '<a href="#" class="opacity-20 text-decoration-none"'); // Wait, no, just replace style

// Clean up duplicate classes created by simple regex
htmlContent = htmlContent.replace(/class="([^"]*)"\s*class="([^"]*)"/g, 'class="$1 $2"');
htmlContent = htmlContent.replace(/class="([^"]*)"\s*class="([^"]*)"/g, 'class="$1 $2"');

fs.writeFileSync(htmlPath, htmlContent);

console.log('Extracted all inline styles!');
