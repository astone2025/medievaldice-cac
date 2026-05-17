const fs = require('fs');

const html = fs.readFileSync('fpi-side-by-side-full.txt', 'utf8');

const splitMarker = '<!-- Modern English Column -->';
let parts = html.split(splitMarker);

if (parts.length < 2) {
    console.error("Could not find the split marker.");
    process.exit(1);
}

let leftCol = parts[0];
// Ensure we just process the actual lines within the left column
let lineCount = 0;
leftCol = leftCol.replace(/<div class="tei-line">(.*?)<\/div>/g, (match, content) => {
    lineCount++;
    // Remove existing line numbers
    content = content.replace(/<span class="tei-line-num">\d+<\/span>/g, '');
    
    if (lineCount % 5 === 0) {
        content = content + `<span class="tei-line-num">${lineCount}</span>`;
    }
    return `<div class="tei-line">${content}</div>`;
});

let rightCol = parts[1];
// Remove any line numbers from the Modern English column
rightCol = rightCol.replace(/<span class="tei-line-num">\d+<\/span>/g, '');

const finalHtml = leftCol + splitMarker + rightCol;

fs.writeFileSync('complete-fpi-html.txt', finalHtml, 'utf8');
console.log("Processed 59 stanzas, max line count:", lineCount);
