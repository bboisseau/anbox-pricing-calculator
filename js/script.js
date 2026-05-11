/**
 * Anbox On-Prem Pricing Calculator
 * All prices are illustrative estimates in USD.
 */

// ---------------------------------------------------------------------------
// Pricing constants
// ---------------------------------------------------------------------------

const NODE_PRICING = {
  virtual: {
    label: 'Virtual machine',
    ubuntuProAnnual: 166.67,
    supportUplifts: {
      none: { label: 'None', annual: 0 },
      'business-days': { label: 'Weekdays', annual: 333.33 },
      '24x7': { label: '24/7', annual: 833.33 },
    },
  },
  physical: {
    label: 'Physical machine',
    ubuntuProAnnual: 500,
    supportUplifts: {
      none: { label: 'None', annual: 0 },
      'business-days': { label: 'Weekdays', annual: 1200 },
      '24x7': { label: '24/7', annual: 2900 },
    },
  },
};

const PROFESSIONAL_SERVICES = {
  0: { label: 'None', annual: 0 },
  1: { label: 'Cluster design/deployment - first cluster', annual: 60000 },
  2: { label: 'Cluster design/deployment - first two clusters', annual: 90000 },
};



// ---------------------------------------------------------------------------
// DOM references
// ---------------------------------------------------------------------------

const nodeTypeEl = document.getElementById('node-type');
const nodesEl = document.getElementById('nodes');
const nodesSlider = document.getElementById('nodes-slider');
const densityEl = document.getElementById('density');
const densitySlider = document.getElementById('density-slider');
const supportEl = document.getElementById('support');
const servicesEl = document.getElementById('services');

const totalCostEl = document.getElementById('total-cost');
const footerTotalEl = document.getElementById('footer-total');
const breakdownBodyEl = document.getElementById('breakdown-body');
const exportBtn = document.getElementById('export-btn');
const summaryStripEl = document.getElementById('summary-strip');

// ---------------------------------------------------------------------------
// Sync slider <-> number input helpers
// ---------------------------------------------------------------------------

function syncSliderToNumber(slider, number) {
  slider.addEventListener('input', () => {
    number.value = slider.value;
    calculate();
  });

  number.addEventListener('input', () => {
    const min = Number(number.min) || 0;
    const max = Number(number.max) || Number.POSITIVE_INFINITY;
    const parsed = Number(number.value);
    const clamped = Math.min(Math.max(parsed || min, min), max);

    number.value = clamped;
    slider.value = Math.min(clamped, Number(slider.max));
    calculate();
  });
}

syncSliderToNumber(nodesSlider, nodesEl);
syncSliderToNumber(densitySlider, densityEl);

[nodeTypeEl, supportEl, servicesEl].forEach((el) => {
  el.addEventListener('change', calculate);
});

// ---------------------------------------------------------------------------
// Pricing calculations
// ---------------------------------------------------------------------------

function calculate() {
  const nodeType = nodeTypeEl.value;
  const nodeCount = Math.max(1, parseInt(nodesEl.value, 10) || 1);
  const density = Math.max(1, parseInt(densityEl.value, 10) || 1);
  const supportKey = supportEl.value;
  const servicesKey = servicesEl.value;

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

  totalCostEl.textContent = formatUSD(totalAnnual);
  footerTotalEl.textContent = formatUSD(totalAnnual);
  summaryStripEl.textContent = `${totalInstances.toLocaleString('en-US')} total instances across ${nodeCount.toLocaleString('en-US')} nodes`;

  const rows = [
    {
      label: `Ubuntu Pro base (${model.label})`,
      unitPrice: `${formatUSD(baseNodePrice)} / node / year`,
      qty: `${nodeCount.toLocaleString('en-US')} nodes`,
      subtotal: formatUSD(baseLicenseTotal),
    },
    {
      label: `Support (${supportUplift.label})`,
      unitPrice: `${formatUSD(supportPerNode)} / node / year`,
      qty: `${nodeCount.toLocaleString('en-US')} nodes`,
      subtotal: formatUSD(supportTotal),
    },
    {
      label: 'Infrastructure total',
      unitPrice: `${formatUSD(effectiveNodePrice)} / node / year`,
      qty: `${nodeCount.toLocaleString('en-US')} nodes`,
      subtotal: formatUSD(infrastructureTotal),
    },
    {
      label: 'Cost per session (reference)',
      unitPrice: 'Node price / density',
      qty: `${formatUSD(effectiveNodePrice)} / ${density}`,
      subtotal: formatUSD(maxPerSessionYearly),
    },
  ];

  if (servicesPlan.annual > 0) {
    rows.push({
      label: `Professional services (${servicesPlan.label})`,
      unitPrice: 'Fixed engagement',
      qty: servicesKey === '1' ? '1 cluster' : '2 clusters',
      subtotal: formatUSD(servicesPlan.annual),
    });
  }

  breakdownBodyEl.innerHTML = rows
    .map(
      (row) => `
    <tr>
      <td>${row.label}</td>
      <td>${row.unitPrice}</td>
      <td>${row.qty}</td>
      <td>${row.subtotal}</td>
    </tr>
  `
    )
    .join('');
}

// ---------------------------------------------------------------------------
// Export as CSV
// ---------------------------------------------------------------------------

exportBtn.addEventListener('click', () => {
  const rows = [...breakdownBodyEl.querySelectorAll('tr')].map((tr) =>
    [...tr.querySelectorAll('td')].map((td) => `"${td.textContent.trim()}"`).join(',')
  );

  const header = '"Line Item","Unit Price","Qty","Subtotal"';
  const footer = `"Yearly Total","","","${footerTotalEl.textContent}"`;
  const csv = [header, ...rows, footer].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'anbox-onprem-estimate.csv';
  a.click();
  URL.revokeObjectURL(url);
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatUSD(value) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

// ---------------------------------------------------------------------------
// Initial render
// ---------------------------------------------------------------------------

calculate();
