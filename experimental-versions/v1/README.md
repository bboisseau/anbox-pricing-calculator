# Anbox On-Prem Pricing Calculator - v1

**Release**: Clean baseline version
**Date**: May 8, 2026

## Features
- On-premises annual per-node licensing model
- Interactive sliders for node count (1-250) and density (1-120)
- Support plan options: None, Business days, 24/7
- Professional services tier pricing
- Volume discount tiers (1-9: 0%, 10-24: 5%, 25-49: 10%, 50+: 15%)
- CSV export functionality
- Responsive design (single column layout)

## What's Included
- **index.html**: Core HTML structure
- **js/script.js**: Pricing calculation engine
- **styles.css**: Clean, minimal styling

## Running
Open `index.html` in a browser. All calculations happen client-side with no external dependencies.

## Key Pricing
- **Virtual machine base**: $500/node/year
- **Physical machine base**: $1,700/node/year
- **Support uplifts**: Business days +50%, 24/7 +100% of base
- **Professional services**: $60k (1 cluster), $90k (2 clusters)

## See Also
- **v2/**: Enhanced design version with improved UI/UX
