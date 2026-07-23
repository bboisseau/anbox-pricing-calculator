const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('js/script.js', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously" });
const document = dom.window.document;

// evaluate script
const scriptEl = document.createElement('script');
scriptEl.textContent = js;
document.body.appendChild(scriptEl);

console.log("V3 Default (QA):");
console.log("Summary:", document.getElementById('v3-summary-text').textContent.trim().replace(/\s+/g, ' '));
console.log("Total:", document.getElementById('v3-total-cost').textContent);

// Change to Dev
document.getElementById('v3-use-case').value = 'dev';
document.getElementById('v3-use-case').dispatchEvent(new dom.window.Event('input'));

console.log("\nV3 Dev:");
console.log("Summary:", document.getElementById('v3-summary-text').textContent.trim().replace(/\s+/g, ' '));
console.log("Total:", document.getElementById('v3-total-cost').textContent);
