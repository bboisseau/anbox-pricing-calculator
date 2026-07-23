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

console.log("V3 Dev:");
document.getElementById('v3-use-case').value = 'dev';
document.getElementById('v3-use-case').dispatchEvent(new dom.window.Event('input'));
console.log("Total Cost Text:", document.getElementById('v3-total-cost').textContent);

const nodePrice = 166.67;
const support = 400;
const nodes = 7;
console.log("Expected Node + Support:", (nodePrice + support) * nodes);
console.log("Expected Node Only:", nodePrice * nodes);

