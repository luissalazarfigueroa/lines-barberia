const fs = require('fs');
const path = require('path');

const dirs = [
"-1072132d", "-31e0e5a1", "-5220de0c", "-5fee976a", "-675d6a6f", "-6e9125b", "-75945e46", "-7a7e3819", "-9116d19", "-a927ae2", "1434b852", "219149c", "27a40900", "2869f2c2", "2c75f1a3", "2d198d7c", "2d5a0ff9", "2e2bd89f", "351d3690", "3bbc6288", "3dd4a7c3", "3ebce611", "5a303cbd", "64f3105c", "70e9d972"
];

let bestFile = null;
let bestTime = 0;
let bestSize = 0;

for (const dir of dirs) {
    const entriesPath = path.join(process.env.APPDATA, 'Code/User/History', dir, 'entries.json');
    if (!fs.existsSync(entriesPath)) continue;
    
    const entries = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
    if (entries.resource && entries.resource.endsWith('index.html')) {
        for (const entry of entries.entries) {
            const entryPath = path.join(process.env.APPDATA, 'Code/User/History', dir, entry.id);
            if (fs.existsSync(entryPath)) {
                const stat = fs.statSync(entryPath);
                // We want the most recent file that is reasonably large (e.g. > 20KB)
                if (stat.size > 20000 && entry.timestamp > bestTime) {
                    bestTime = entry.timestamp;
                    bestFile = entryPath;
                    bestSize = stat.size;
                }
            }
        }
    }
}

console.log('Best file:', bestFile);
console.log('Best time:', new Date(bestTime).toLocaleString());
console.log('Best size:', bestSize);

if (bestFile) {
    fs.copyFileSync(bestFile, 'c:/Users/Luis/Desktop/Lines/lines-core/index_recovered.html');
    console.log('Copied to index_recovered.html');
}
