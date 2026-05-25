const fs = require('fs');

const cssPath = 'c:/Users/Luis/Desktop/Lines/lines-core/style.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// 1. Add CSS Variables for Spacing
const varInject = `
  /* Vertical Spacing System */
  --space-xl: clamp(60px, 8vh, 100px); /* Section padding top/bottom */
  --space-lg: clamp(40px, 6vh, 60px);  /* Title to content gaps */
  --space-md: clamp(20px, 3vh, 30px);  /* Medium gaps */
  --space-sm: clamp(10px, 1.5vh, 15px);  /* Small gaps */
`;
cssContent = cssContent.replace('/* Layout */', varInject + '\n  /* Layout */');

// 2. Replace section padding
cssContent = cssContent.replace(
    /section\s*{\s*padding-top:\s*clamp\([^;]+;\s*padding-bottom:\s*clamp\([^;]+;/g,
    'section {\n  padding-top: var(--space-xl);\n  padding-bottom: var(--space-xl);'
);

// 3. Replace .bento-cell padding
cssContent = cssContent.replace(
    /padding:\s*clamp\(2rem,\s*4vw,\s*4rem\)/g,
    'padding: var(--space-lg)'
);

// 4. Update hero-eyebrow
cssContent = cssContent.replace(
    /margin-bottom:\s*1rem;/,
    'margin-bottom: var(--space-sm);'
);

// 5. Add Utilities
const utilities = `
.mb-xl { margin-bottom: var(--space-xl) !important; }
.mb-lg { margin-bottom: var(--space-lg) !important; }
.mb-md { margin-bottom: var(--space-md) !important; }
.mb-sm { margin-bottom: var(--space-sm) !important; }

.mt-xl { margin-top: var(--space-xl) !important; }
.mt-lg { margin-top: var(--space-lg) !important; }
.mt-md { margin-top: var(--space-md) !important; }

.pt-xl { padding-top: var(--space-xl) !important; }
.pb-xl { padding-bottom: var(--space-xl) !important; }
.px-margin { padding-left: var(--margin-factor) !important; padding-right: var(--margin-factor) !important; }
`;
if (!cssContent.includes('.mb-xl')) {
    cssContent += utilities;
}

fs.writeFileSync(cssPath, cssContent);

// HTML REFACTORING
const htmlPath = 'c:/Users/Luis/Desktop/Lines/lines-core/index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Replace standard bootstrap margins on section header rows
htmlContent = htmlContent.replace(/mb-5/g, 'mb-xl');
htmlContent = htmlContent.replace(/mb-4/g, 'mb-lg');
htmlContent = htmlContent.replace(/mt-4/g, 'mt-lg');
htmlContent = htmlContent.replace(/mt-5/g, 'mt-xl');

// Replace specific inline hardcoded clamp margins
htmlContent = htmlContent.replace(/style="padding:\s*clamp\(60px,\s*8vw,\s*100px\)\s*var\(--margin-factor\)\s*0\s*var\(--margin-factor\);"/g, 'class="pt-xl px-margin"');

// There's also `style="padding: clamp(...) var(--margin-factor);"` maybe?
// Wait, Galería, Testimonios have `padding: clamp(...) var(--margin-factor) 0 var(--margin-factor)`? Let's be flexible
htmlContent = htmlContent.replace(/style="padding:\s*clamp\([^;]+\)\s*var\(--margin-factor\)[^;]*;"/g, 'class="pt-xl px-margin"');

// Fix the Cursos padding
htmlContent = htmlContent.replace(/style="padding:\s*clamp\([^;]+\)\s*var\(--margin-factor\);\s*border-bottom[^"]+"/g, 'class="pt-xl px-margin border-bottom-hard"');

fs.writeFileSync(htmlPath, htmlContent);

console.log('Margins refactored successfully.');
