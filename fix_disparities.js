const fs = require('fs');

const cssPath = 'c:/Users/Luis/Desktop/Lines/lines-core/style.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const bentoH2Fix = `
/* Bento Cell Header Fix */
.bento-cell h2 {
    margin-bottom: 0 !important;
}
`;
if (!cssContent.includes('Bento Cell Header Fix')) {
    cssContent += bentoH2Fix;
}

// In .brutal-section .section-label, wait, what if the label is inside .bento-cell?
// .bento-cell padding is var(--space-lg). So the label should have its normal small bottom margin.
// Then the h2 will have NO bottom margin. The bento-cell's bottom padding var(--space-lg) will be the gap below h2. This perfectly matches the var(--space-lg) bottom margin of other h2s!

fs.writeFileSync(cssPath, cssContent);

const htmlPath = 'c:/Users/Luis/Desktop/Lines/lines-core/index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Remove mt-xl from h2
htmlContent = htmlContent.replace(/<h2 class="about-line reveal-up mt-xl">/g, '<h2 class="about-line reveal-up">');

fs.writeFileSync(htmlPath, htmlContent);

console.log('Fixed specific disparities.');
