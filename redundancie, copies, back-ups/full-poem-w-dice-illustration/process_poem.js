const fs = require('fs');

const html = fs.readFileSync('fpi-side-by-side-full.txt', 'utf8');

// The file has two columns.
// Let's use simple regex to split into left and right columns.
const colRegex = /<div class="tei-poem-column">([\s\S]*?)<!-- Modern English Column -->\s*<div class="tei-poem-column">([\s\S]*?)<\/div>\s*<\/div>/;
let match = colRegex.exec(html);

if (!match) {
    console.error("Could not parse columns.");
    process.exit(1);
}

let leftCol = match[1];
let rightCol = match[2];

// Add line numbers to leftCol
let lineCount = 0;
leftCol = leftCol.replace(/<div class="tei-line">(.*?)<\/div>/g, (match, content) => {
    lineCount++;
    // Remove existing line numbers just in case
    content = content.replace(/<span class="tei-line-num">\d+<\/span>/g, '');
    
    if (lineCount % 5 === 0) {
        content = content + `<span class="tei-line-num">${lineCount}</span>`;
    }
    return `<div class="tei-line">${content}</div>`;
});

// Remove line numbers from rightCol
rightCol = rightCol.replace(/<span class="tei-line-num">\d+<\/span>/g, '');

const finalHtml = `<div class="tei-side-by-side-wrapper">
    <!-- Middle English Column -->
    <div class="tei-poem-column">${leftCol}<!-- Modern English Column -->
    <div class="tei-poem-column">${rightCol}</div>
</div>`;

fs.writeFileSync('complete-fpi-html.txt', finalHtml, 'utf8');
console.log("Processed 59 stanzas, max line count:", lineCount);
