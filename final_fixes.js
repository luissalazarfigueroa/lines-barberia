const fs = require('fs');

const htmlPath = 'c:/Users/Luis/Desktop/Lines/lines-core/index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Fix red-btn
htmlContent = htmlContent.replace(/class="red-btn"/g, 'class="btn btn-lines-dark"');

// Fix Hero SVG scissors
htmlContent = htmlContent.replace(/viewBox="0 0 30 34"/g, 'viewBox="0 0 35 34"');
htmlContent = htmlContent.replace(/transform:\s*rotate\(35deg\)\s*translate\(5px,\s*0px\)/g, 'transform: rotate(35deg) translate(5px, -5px)');

fs.writeFileSync(htmlPath, htmlContent);
console.log("Final touch-ups applied.");
