const fs = require('fs');
const edits = require('./edits.json');

const basePath = 'c:/Users/Luis/Desktop/Lines/lines-core/index_base.html';
const htmlPath = 'c:/Users/Luis/Desktop/Lines/lines-core/index.html';
let htmlContent = fs.readFileSync(basePath, 'utf16le'); // PowerShell `>` outputs in UTF-16LE usually, wait!
// Let me just read as utf8 and see if it has null bytes.
if (htmlContent.includes('\u0000')) {
    htmlContent = fs.readFileSync(basePath, 'utf16le');
} else {
    htmlContent = fs.readFileSync(basePath, 'utf8');
}

// Function to perform replacement
function doReplace(html, target, replacement) {
    // Normalize newlines in both for comparison just in case
    if (!html.includes(target)) {
        // Try normalizing CRLF to LF
        const normTarget = target.replace(/\r\n/g, '\n');
        const normHtml = html.replace(/\r\n/g, '\n');
        if (normHtml.includes(normTarget)) {
            return normHtml.replace(normTarget, replacement);
        }
        console.warn('WARNING: Target string not found! Target:', target.substring(0, 50).replace(/\n/g, ' '));
        return html; // Skip if not found
    }
    return html.replace(target, replacement);
}

let skipped = 0;

for (let i = 0; i < edits.length; i++) {
    const edit = edits[i];
    console.log(`Applying edit ${i+1}/${edits.length} (Step ${edit.step}) - ${edit.name}`);

    if (edit.name === 'replace_file_content') {
        const target = JSON.parse(edit.args.TargetContent);
        const replacement = JSON.parse(edit.args.ReplacementContent);
        const newHtml = doReplace(htmlContent, target, replacement);
        if (newHtml === htmlContent) skipped++;
        htmlContent = newHtml;
    } else if (edit.name === 'multi_replace_file_content') {
        let chunks;
        try {
            chunks = JSON.parse(JSON.parse(edit.args.ReplacementChunks));
        } catch (e) {
            chunks = JSON.parse(edit.args.ReplacementChunks);
        }
        if (typeof chunks === 'string') chunks = JSON.parse(chunks);
        
        for (const chunk of chunks) {
            const target = chunk.TargetContent;
            const replacement = chunk.ReplacementContent;
            const newHtml = doReplace(htmlContent, target, replacement);
            if (newHtml === htmlContent) skipped++;
            htmlContent = newHtml;
        }
    }
}

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log(`Applied edits. Skipped ${skipped} chunks that weren't found.`);
