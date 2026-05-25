const fs = require('fs');

const cssPath = 'c:/Users/Luis/Desktop/Lines/lines-core/style.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

let replacedCount = 0;

cssContent = cssContent.replace(/font-size:\s*([^;!]+)(!important)?;/g, (match, val, imp) => {
    val = val.trim();
    let impStr = imp ? ' !important' : '';
    
    // Ignore if already using var
    if (val.includes('var(--fs-')) return match;

    let targetVar = '--fs-sm';

    if (val.startsWith('clamp')) {
        // extract first value
        const m = val.match(/clamp\(\s*([\d\.]+)px/);
        if (m) {
            const minPx = parseFloat(m[1]);
            if (minPx >= 35) targetVar = '--fs-xl';
            else if (minPx >= 24) targetVar = '--fs-lg';
            else if (minPx >= 18) targetVar = '--fs-md';
            else targetVar = '--fs-sm';
        } else {
            const remMatch = val.match(/clamp\(\s*([\d\.]+)rem/);
            if (remMatch && parseFloat(remMatch[1]) >= 2) targetVar = '--fs-xl';
        }
    } else {
        const m = val.match(/^([\d\.]+)(px|vw|rem)/);
        if (m) {
            const num = parseFloat(m[1]);
            const unit = m[2];
            if (unit === 'vw' || unit === 'rem') {
                targetVar = '--fs-xl';
            } else {
                if (num >= 40) targetVar = '--fs-xl';
                else if (num >= 24) targetVar = '--fs-lg';
                else if (num >= 18) targetVar = '--fs-md';
                else targetVar = '--fs-sm';
            }
        }
    }
    
    replacedCount++;
    return `font-size: var(${targetVar})${impStr};`;
});

fs.writeFileSync(cssPath, cssContent);
console.log(`Typography standardized. Replaced ${replacedCount} font-size declarations.`);
