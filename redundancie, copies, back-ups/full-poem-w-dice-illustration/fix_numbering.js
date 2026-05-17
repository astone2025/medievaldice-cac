const fs = require('fs');

const html = fs.readFileSync('fpi-side-by-side-full.txt', 'utf8');

const splitMarker = '<!-- Modern English Column -->';
let parts = html.split(splitMarker);

if (parts.length < 2) {
    console.error("Could not find the split marker.");
    process.exit(1);
}

let leftCol = parts[0];
let lineCount = 0;

// The regex needs to be careful. In the source file, 
// some stanzas have the lines on their own lines, some are condensed.
// We only want to count actual poem lines inside the Middle English column.
leftCol = leftCol.replace(/<div class="tei-line">(.*?)<\/div>/g, (match, content) => {
    lineCount++;
    // Clean out existing numbering markers
    content = content.replace(/<span class="tei-line-num">.*?<\/span>/g, '');
    
    // Check if this is a 5th line
    if (lineCount % 5 === 0) {
        content = content + `<span class="tei-line-num">${lineCount}</span>`;
    }
    return `<div class="tei-line">${content}</div>`;
});

let rightCol = parts[1];
// Ensure no numbering remains in the right column
rightCol = rightCol.replace(/<span class="tei-line-num">.*?<\/span>/g, '');

const finalHtml = leftCol + splitMarker + rightCol;

fs.writeFileSync('complete-fpi-html.txt', finalHtml, 'utf8');
console.log("Re-processed 59 stanzas. Total lines:", lineCount);
console.log("First marker placed at line 5.");
