const fs = require('fs');

const css = fs.readFileSync('css/styles.css', 'utf8');
const js = fs.readFileSync('js/script.js', 'utf8');
const html = fs.readFileSync('index.html', 'utf8');

// Extract V1 JS logic safely
const pricingConstants = js.substring(0, js.indexOf('// OPTION 3'));
const v1LogicStartIndex = js.indexOf('// OPTION 1: ORIGINAL CALCULATOR');
const v1Logic = js.substring(v1LogicStartIndex);
const finalJS = pricingConstants + '\n' + v1Logic;

// Use regex to remove tabs, option2, and option3 from HTML
let cleanHtml = html
  .replace(/<div class="tabs">[\s\S]*?<\/div>/, '') // remove tabs
  .replace(/<!-- OPTION 3: GUIDED ESTIMATOR \(New AI Paradigm\) -->[\s\S]*?<!-- OPTION 2: SIMPLIFIED CALCULATOR -->/, '')
  .replace(/<div id="option2" class="tab-content">[\s\S]*?<!-- OPTION 1: ORIGINAL CALCULATOR -->/, '');

// Make option1 the only content and visible
cleanHtml = cleanHtml.replace(/<div id="option1" class="tab-content">/, '<div id="option1" class="tab-content" style="display:block;">');

// Inject CSS and JS
cleanHtml = cleanHtml.replace('<link rel="stylesheet" href="css/styles.css" />', `<style>\n${css}\n</style>`);
cleanHtml = cleanHtml.replace('<script src="js/script.js"></script>', `<script>\n${finalJS}\n</script>`);

fs.writeFileSync('original-calculator-standalone.html', cleanHtml);
console.log('Fixed JS!');
