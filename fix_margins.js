const fs = require('fs');

const cssPath = 'c:/Users/Luis/Desktop/Lines/lines-core/style.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const universalMargins = `
/* Universal Header Margins */
.brutal-section .section-label {
    margin-top: 0 !important;
    margin-bottom: var(--space-sm) !important;
}
.brutal-section h2 {
    margin-top: 0 !important;
    margin-bottom: var(--space-lg) !important;
}
`;
if (!cssContent.includes('Universal Header Margins')) {
    cssContent += universalMargins;
}
fs.writeFileSync(cssPath, cssContent);

const htmlPath = 'c:/Users/Luis/Desktop/Lines/lines-core/index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Strip margins from h2 and section-labels
htmlContent = htmlContent.replace(/<h2([^>]*)class="([^"]*?)\s*mb-[a-z0-9]+([^"]*)"/g, '<h2$1class="$2$3"');
htmlContent = htmlContent.replace(/<p([^>]*)class="([^"]*?)\s*mb-[a-z0-9]+([^"]*)"/g, '<p$1class="$2$3"');

// Specifically handle cases where mb-0 was the only class (shouldn't happen because they have other classes like reveal-up)
htmlContent = htmlContent.replace(/class="\s*"/g, ''); 

// Clean up wrapping rows that have mb-xl, mb-lg, mb-md, mb-sm
htmlContent = htmlContent.replace(/<div([^>]*)class="([^"]*?)\s*mb-[a-z0-9]+([^"]*)"/g, '<div$1class="$2$3"');
htmlContent = htmlContent.replace(/<div([^>]*)class="([^"]*?)\s*mt-[a-z0-9]+([^"]*)"/g, '<div$1class="$2$3"');

// Fix trailing spaces in class attributes
htmlContent = htmlContent.replace(/class="([^"]+)\s+"/g, 'class="$1"');
htmlContent = htmlContent.replace(/class="\s+([^"]+)"/g, 'class="$1"');

fs.writeFileSync(htmlPath, htmlContent);

console.log('Fixed header margins.');
