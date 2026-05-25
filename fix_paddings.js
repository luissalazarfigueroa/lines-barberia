const fs = require('fs');

const cssPath = 'c:/Users/Luis/Desktop/Lines/lines-core/style.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const paddingUtilities = `
/* Vertical Padding Utilities */
.pt-xl { padding-top: var(--space-xl) !important; }
.pb-xl { padding-bottom: var(--space-xl) !important; }
.py-xl { padding-top: var(--space-xl) !important; padding-bottom: var(--space-xl) !important; }
.py-lg { padding-top: var(--space-lg) !important; padding-bottom: var(--space-lg) !important; }
.py-md { padding-top: var(--space-md) !important; padding-bottom: var(--space-md) !important; }
.py-sm { padding-top: var(--space-sm) !important; padding-bottom: var(--space-sm) !important; }
`;
if (!cssContent.includes('Vertical Padding Utilities')) {
    cssContent += paddingUtilities;
}
fs.writeFileSync(cssPath, cssContent);

const htmlPath = 'c:/Users/Luis/Desktop/Lines/lines-core/index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// 1. Hero Content
htmlContent = htmlContent.replace(/padding-bottom:\s*5vh;/g, '');
htmlContent = htmlContent.replace(/py-5/g, 'py-xl');

// 2. About Experimental section
htmlContent = htmlContent.replace(/style="padding:\s*0;\s*overflow:\s*hidden;\s*"/g, 'class="brutal-section brutal-section-p0 overflow-hidden"');
htmlContent = htmlContent.replace(/padding-top:\s*clamp\([^)]+\);\s*padding-bottom:\s*clamp\([^)]+\);/g, '');
// Since we removed the clamp padding from style="..." on col-lg-7, we need to add py-xl to its class
htmlContent = htmlContent.replace(/class="col-lg-7 d-flex align-items-center"/g, 'class="col-lg-7 d-flex align-items-center py-xl"');

// 3. Productos section
htmlContent = htmlContent.replace(/style="position:\s*relative;\s*min-height:\s*fit-content;\s*padding:\s*0"/g, 'style="position: relative; min-height: fit-content;" class="brutal-section brutal-section-p0"');

// 4. Any remaining class="... pt-5" or pb-5
htmlContent = htmlContent.replace(/pt-5/g, 'pt-xl');
htmlContent = htmlContent.replace(/pb-5/g, 'pb-xl');
htmlContent = htmlContent.replace(/pt-4/g, 'pt-lg');
htmlContent = htmlContent.replace(/pb-4/g, 'pb-lg');
htmlContent = htmlContent.replace(/py-4/g, 'py-lg');

// We noticed some mobile views had <div class="text-center d-md-none" style="padding: 0 var(--margin-factor);">
// This is horizontal padding, but wait, those were buttons. They are fine.

fs.writeFileSync(htmlPath, htmlContent);

console.log('Fixed vertical paddings.');
