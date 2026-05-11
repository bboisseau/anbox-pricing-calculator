# Anbox On-Prem Pricing Calculator

An interactive web-based calculator for estimating annual infrastructure licensing costs for **Anbox Cloud** on-premises deployments.

## Overview

This tool helps organizations quickly estimate the total cost of ownership (TCO) for deploying Anbox Cloud on their own infrastructure. The calculator factors in machine type, node count, density, support plans, and professional services to provide accurate pricing estimates.

## Features

- **Machine Type Selection**: Choose between virtual and physical machines
- **Flexible Configuration**: 
  - Node count: 1-250 nodes (expandable to 2,000)
  - Instance density: 1-120 instances per machine
- **Support Options**: None, Business days, or 24/7 coverage
- **Professional Services**: Pricing for cluster design and deployment
- **Volume Discounts**: Automatic tiered discounts (5-15%) based on node count
- **CSV Export**: Download pricing breakdowns for analysis
- **Client-Side Calculation**: No external dependencies, all computation runs in the browser
- **Responsive Design**: Works on desktop and mobile

## Getting Started

### Quick Start
Simply open `index.html` in a web browser. The calculator is fully functional with no setup or installation required.

### Project Structure

```
anbox-pricing-calculator/
├── index.html          # Main calculator interface
├── css/styles.css      # Styling and layout
├── js/script.js        # Calculation engine
├── v1/                 # v1 release artifacts
├── v2/                 # Enhanced UI/UX version
└── v3/                 # Latest improvements
```

## Usage

1. Select your machine type (Virtual or Physical)
2. Adjust the number of nodes using the slider or text input
3. Set the instance density (instances per machine)
4. Choose a support plan level
5. Select professional services tier if applicable
6. View the real-time cost breakdown
7. Export to CSV for reporting or sharing

## Calculation Details

The total annual cost is calculated as:

```
Total = (Node Licensing × Node Count) 
        - Volume Discounts 
        + Support (Support Tier × Node Count) 
        + Professional Services
```

## Browser Compatibility

Works in all modern browsers (Chrome, Firefox, Safari, Edge) that support:
- ES6 JavaScript
- HTML5 forms and inputs
- CSS Grid and Flexbox

## Versioning

**Current Version**: 1.0.0 (Latest & Greatest)

The root directory contains the latest production-ready version. For historical reference and experimental versions, see `experimental-versions/`:
- **v1**: Original working baseline (foundation for 1.0.0)
- **v2**: Earlier design exploration 
- **v3**: Earlier design exploration

## License

All rights reserved. For licensing inquiries, contact the Anbox team.

## Support

For questions about pricing or feature requests, please reach out to the Anbox team.

---

**Current Version**: 1.0.0  
**Last Updated**: May 11, 2026
