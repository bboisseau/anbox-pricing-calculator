/**
 * Anbox On-Prem Pricing Estimator
 * 3-Option Unified Interface
 */

// ---------------------------------------------------------------------------
// Pricing Constants
// ---------------------------------------------------------------------------

const NODE_PRICING = {
  virtual: {
    label: 'Virtual machine',
    ubuntuProAnnual: 166.67,
    supportUplifts: {
      none: { label: 'None', annual: 0 },
      'business-days': { label: 'Weekday', annual: 400 },
      '24x7': { label: '24/7', annual: 966.66 },
    },
  },
  physical: {
    label: 'Physical machine',
    ubuntuProAnnual: 500,
    supportUplifts: {
      none: { label: 'None', annual: 0 },
      'business-days': { label: 'Weekday', annual: 1200 },
      '24x7': { label: '24/7', annual: 2900 },
    },
  },
};

const PROFESSIONAL_SERVICES = {
  0: { label: 'None', annual: 0 },
  1: { label: 'Cluster design/deployment - first cluster', annual: 60000 },
  2: { label: 'Cluster design/deployment - first two clusters', annual: 90000 },
};

// Formatting helper
function formatUSD(value) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

// ---------------------------------------------------------------------------
// Tab Switching Logic
// ---------------------------------------------------------------------------

const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active classes
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    
    // Add active to clicked
    btn.classList.add('active');
    const targetId = btn.getAttribute('data-target');
    document.getElementById(targetId).classList.add('active');
  });
});

// ---------------------------------------------------------------------------
// OPTION 3: GUIDED ESTIMATOR (V3)
// ---------------------------------------------------------------------------

const v3UseCaseEl = document.getElementById('v3-use-case');
const v3ScaleEl = document.getElementById('v3-scale');
const v3ScaleLabel = document.getElementById('v3-scale-label');
const v3ServicesEl = document.getElementById('v3-services');
const v3SummaryText = document.getElementById('v3-summary-text');
const v3TotalCostEl = document.getElementById('v3-total-cost');

const USE_CASE_CONFIG = {
  'qa': {
    prompt: 'How many concurrent test runners do you need?',
    unitName: 'concurrent test runners',
    machineType: 'virtual',
    support: '24x7',
    supportReason: 'Because CI/CD pipelines typically require high availability',
    multiplier: 1, // 1 runner = 1 instance
    density: 15, // 15 instances per node
  },
  'dev': {
    prompt: 'How many developers are on your team?',
    unitName: 'developers',
    machineType: 'virtual',
    support: 'business-days',
    supportReason: 'For standard development workflows',
    multiplier: 2, // 1 dev = 2 instances
    density: 15,
  },
  'gaming': {
    prompt: 'What is your expected peak concurrent player count?',
    unitName: 'concurrent players',
    machineType: 'physical',
    support: '24x7',
    supportReason: 'Because consumer-facing gaming requires high availability',
    multiplier: 1, // 1 player = 1 instance
    density: 5,
  },
  'auto': {
    prompt: 'How many engineers are developing/testing infotainment clusters?',
    unitName: 'engineers',
    machineType: 'virtual',
    support: 'business-days',
    supportReason: 'For standard automotive development workflows',
    multiplier: 1, // 1 engineer = 1 instance
    density: 5,
  },
  'enterprise': {
    prompt: 'How many employees need secure virtual workspaces?',
    unitName: 'employees',
    machineType: 'virtual',
    support: '24x7',
    supportReason: 'Because enterprise work environments typically require high availability',
    multiplier: 1, // 1 employee = 1 instance
    density: 5,
  },
  'ai': {
    prompt: 'How many AI agents will be running simultaneously?',
    unitName: 'AI agents',
    machineType: 'virtual',
    support: '24x7',
    supportReason: 'Because automated AI operations typically require high availability',
    multiplier: 1, // 1 agent = 1 instance
    density: 15,
  }
};

function calculateV3() {
  const useCaseKey = v3UseCaseEl.value;
  const config = USE_CASE_CONFIG[useCaseKey];
  const scaleInput = Math.max(1, parseInt(v3ScaleEl.value, 10) || 1);
  const includeServices = v3ServicesEl.checked;
  
  // Update prompt label dynamically
  v3ScaleLabel.textContent = config.prompt;
  
  // Math
  const totalInstances = scaleInput * config.multiplier;
  const nodesRequired = Math.ceil(totalInstances / config.density);
  
  const model = NODE_PRICING[config.machineType];
  const supportUplift = model.supportUplifts[config.support];
  
  const nodePrice = model.ubuntuProAnnual + supportUplift.annual;
  let totalAnnual = nodePrice * nodesRequired;
  
  if (includeServices) {
    totalAnnual += PROFESSIONAL_SERVICES[1].annual;
  }
  
  // Update UI
  v3TotalCostEl.textContent = formatUSD(totalAnnual);
  
  const servicesText = includeServices ? ' This estimate also includes <strong>professional deployment services</strong> for your first cluster.' : '';
  const supportName = config.support === 'business-days' ? 'Weekday' : supportUplift.label;
  
  v3SummaryText.innerHTML = `To support <strong>${scaleInput.toLocaleString()} ${config.unitName}</strong>, we estimate you will need <strong>~${nodesRequired.toLocaleString()} ${config.machineType} nodes</strong>. ${config.supportReason}, this estimate includes <strong>${supportName} support</strong>.${servicesText}`;
}

[v3UseCaseEl, v3ScaleEl, v3ServicesEl].forEach(el => el.addEventListener('input', calculateV3));
calculateV3();

// ---------------------------------------------------------------------------
// OPTION 2: SIMPLIFIED CALCULATOR (V2)
// ---------------------------------------------------------------------------

const v2NodeTypeEl = document.getElementById('v2-node-type');
const v2NodesEl = document.getElementById('v2-nodes');
const v2SupportEl = document.getElementById('v2-support');
const v2ServicesEl = document.getElementById('v2-services');
const v2TotalCostEl = document.getElementById('v2-total-cost');
const v2SummaryStripEl = document.getElementById('v2-summary-strip');

function calculateV2() {
  const nodeType = v2NodeTypeEl.value;
  const nodeCount = Math.max(1, parseInt(v2NodesEl.value, 10) || 1);
  const supportKey = v2SupportEl.value;
  const includeServices = v2ServicesEl.checked;
  
  const assumedDensity = 10; // Hidden baseline density
  
  const model = NODE_PRICING[nodeType];
  const supportUplift = model.supportUplifts[supportKey];
  const servicesPlan = includeServices ? PROFESSIONAL_SERVICES[1] : PROFESSIONAL_SERVICES[0];
  
  const baseNodePrice = model.ubuntuProAnnual;
  const supportPerNode = supportUplift.annual;
  const effectiveNodePrice = baseNodePrice + supportPerNode;
  
  const baseLicenseTotal = baseNodePrice * nodeCount;
  const supportTotal = supportPerNode * nodeCount;
  const infrastructureTotal = effectiveNodePrice * nodeCount;
  
  const totalAnnual = infrastructureTotal + servicesPlan.annual;
  const totalInstances = nodeCount * assumedDensity;
  
  v2TotalCostEl.textContent = formatUSD(totalAnnual);
  v2SummaryStripEl.textContent = `~${totalInstances.toLocaleString('en-US')} estimated instances capacity across ${nodeCount.toLocaleString('en-US')} nodes`;
}

[v2NodeTypeEl, v2NodesEl, v2SupportEl, v2ServicesEl].forEach(el => el.addEventListener('input', calculateV2));
calculateV2();
// ---------------------------------------------------------------------------
// OPTION 1: ORIGINAL CALCULATOR (V1)
// ---------------------------------------------------------------------------

const v1NodeTypeEl = document.getElementById('v1-node-type');
const v1NodesEl = document.getElementById('v1-nodes');
const v1NodesSlider = document.getElementById('v1-nodes-slider');
const v1DensityEl = document.getElementById('v1-density');
const v1DensitySlider = document.getElementById('v1-density-slider');
const v1SupportEl = document.getElementById('v1-support');
const v1ServicesEl = document.getElementById('v1-services');
const v1TotalCostEl = document.getElementById('v1-total-cost');
const v1FooterTotalEl = document.getElementById('v1-footer-total');
const v1BreakdownBodyEl = document.getElementById('v1-breakdown-body');
const v1ExportBtn = document.getElementById('v1-export-btn');
const v1SummaryStripEl = document.getElementById('v1-summary-strip');

function syncSliderToNumber(slider, number, callback) {
  slider.addEventListener('input', () => { number.value = slider.value; callback(); });
  number.addEventListener('input', () => {
    const min = Number(number.min) || 0;
    const max = Number(number.max) || Number.POSITIVE_INFINITY;
    const parsed = Number(number.value);
    const clamped = Math.min(Math.max(parsed || min, min), max);
    number.value = clamped;
    slider.value = Math.min(clamped, Number(slider.max));
    callback();
  });
}

syncSliderToNumber(v1NodesSlider, v1NodesEl, calculateV1);
syncSliderToNumber(v1DensitySlider, v1DensityEl, calculateV1);

function calculateV1() {
  const nodeType = v1NodeTypeEl.value;
  const nodeCount = Math.max(1, parseInt(v1NodesEl.value, 10) || 1);
  const density = Math.max(1, parseInt(v1DensityEl.value, 10) || 1);
  const supportKey = v1SupportEl.value;
  const servicesKey = v1ServicesEl.value;

  const model = NODE_PRICING[nodeType] || NODE_PRICING.virtual;
  const supportUplift = model.supportUplifts[supportKey] || model.supportUplifts.none;
  const servicesPlan = PROFESSIONAL_SERVICES[servicesKey] || PROFESSIONAL_SERVICES[0];

  const baseNodePrice = model.ubuntuProAnnual;
  const supportPerNode = supportUplift.annual;
  const effectiveNodePrice = baseNodePrice + supportPerNode;

  const baseLicenseTotal = baseNodePrice * nodeCount;
  const supportTotal = supportPerNode * nodeCount;
  const infrastructureTotal = effectiveNodePrice * nodeCount;

  const totalAnnual = infrastructureTotal + servicesPlan.annual;
  const totalInstances = nodeCount * density;
  const maxPerSessionYearly = density > 0 ? effectiveNodePrice / density : 0;

  v1TotalCostEl.textContent = formatUSD(totalAnnual);
  v1FooterTotalEl.textContent = formatUSD(totalAnnual);
  v1SummaryStripEl.textContent = `${totalInstances.toLocaleString('en-US')} total instances across ${nodeCount.toLocaleString('en-US')} nodes`;

  const rows = [
    { label: `Ubuntu Pro base (${model.label})`, unitPrice: `${formatUSD(baseNodePrice)} / node / year`, qty: `${nodeCount.toLocaleString('en-US')} nodes`, subtotal: formatUSD(baseLicenseTotal) },
    { label: `Support (${supportUplift.label})`, unitPrice: `${formatUSD(supportPerNode)} / node / year`, qty: `${nodeCount.toLocaleString('en-US')} nodes`, subtotal: formatUSD(supportTotal) },
    { label: 'Infrastructure total', unitPrice: `${formatUSD(effectiveNodePrice)} / node / year`, qty: `${nodeCount.toLocaleString('en-US')} nodes`, subtotal: formatUSD(infrastructureTotal) },
    { label: 'Cost per session (reference)', unitPrice: 'Node price / density', qty: `${formatUSD(effectiveNodePrice)} / ${density}`, subtotal: formatUSD(maxPerSessionYearly) },
  ];

  if (servicesPlan.annual > 0) {
    rows.push({ label: `Professional services (${servicesPlan.label})`, unitPrice: 'Fixed engagement', qty: servicesKey === '1' ? '1 cluster' : '2 clusters', subtotal: formatUSD(servicesPlan.annual) });
  }

  v1BreakdownBodyEl.innerHTML = rows.map(r => `<tr><td>${r.label}</td><td>${r.unitPrice}</td><td>${r.qty}</td><td>${r.subtotal}</td></tr>`).join('');
}

[v1NodeTypeEl, v1SupportEl, v1ServicesEl].forEach(el => el.addEventListener('change', calculateV1));
calculateV1();

v1ExportBtn.addEventListener('click', () => {
  const rows = [...v1BreakdownBodyEl.querySelectorAll('tr')].map(tr => [...tr.querySelectorAll('td')].map(td => `"${td.textContent.trim()}"`).join(','));
  const csv = ['"Line Item","Unit Price","Qty","Subtotal"', ...rows, `"Yearly Total","","","${v1FooterTotalEl.textContent}"`].join('\n');
  downloadCSV(csv, 'anbox-onprem-estimate.csv');
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function downloadCSV(csvContent, filename) {
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
