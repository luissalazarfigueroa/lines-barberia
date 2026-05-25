const fs = require('fs');

const htmlPath = 'c:/Users/Luis/Desktop/Lines/lines-core/index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Replace inline styles with classes
const literalReplacements = {
    'class="brutal-section" style="padding: 0; background: var(--color-bg-dark); border-bottom: 1px solid black;"': 'class="brutal-section brutal-section-p0 bg-dark border-bottom-hard"',
    'class="brutal-section" style="padding: 0; overflow: hidden;"': 'class="brutal-section brutal-section-p0 overflow-hidden"',
    'class="brutal-section" style="padding: 0; position: relative; overflow: hidden; background: var(--color-bg-dark);"': 'class="brutal-section brutal-section-p0 bg-dark relative overflow-hidden"',
    'class="brutal-section" style="padding: 0; background: var(--color-bg-beige);"': 'class="brutal-section brutal-section-p0 bg-beige"',
    'class="brutal-section" style="padding: 0; background: var(--color-bg-light); border-bottom: 1px solid black;"': 'class="brutal-section brutal-section-p0 bg-light border-bottom-hard"',
    'class="brutal-section" style="padding: 0; background: var(--color-bg-light);"': 'class="brutal-section brutal-section-p0 bg-light"',
    'class="brutal-section" style="padding: 0; overflow: hidden; background: var(--color-bg-light);"': 'class="brutal-section brutal-section-p0 bg-light overflow-hidden"'
};

for (const [oldStr, newStr] of Object.entries(literalReplacements)) {
    htmlContent = htmlContent.replace(oldStr, newStr);
}

// Write html back
fs.writeFileSync(htmlPath, htmlContent);

// Add utility classes to css
const cssPath = 'c:/Users/Luis/Desktop/Lines/lines-core/style.css';
const utilityCSS = `
/* ─── UTILITY CLASSES ──────────────────────────────────────────────────────── */
.bg-dark { background-color: var(--color-bg-dark) !important; color: var(--color-bg-light); }
.bg-light { background-color: var(--color-bg-light) !important; color: var(--color-bg-dark); }
.bg-beige { background-color: var(--color-bg-beige) !important; color: var(--color-bg-dark); }
.brutal-section-p0 { padding: 0 !important; }
.border-bottom-hard { border-bottom: 1px solid black !important; }
.relative { position: relative !important; }
.overflow-hidden { overflow: hidden !important; }
`;
fs.appendFileSync(cssPath, utilityCSS);

console.log('HTML styles replaced and CSS updated successfully.');
