# Release Notes

## Version 1.0.0 - Official Release
**Release Date**: May 11, 2026

### Overview
Anbox On-Prem Pricing Calculator v1.0.0 is the official release of an interactive web-based tool for estimating infrastructure licensing costs for Anbox Cloud on-premises deployments.

### ✨ Features

#### Core Functionality
- **Machine Type Selection**: Toggle between virtual and physical machines
- **Node Count Configuration**: Interactive slider (1-250) with manual input support up to 2,000
- **Density Control**: Adjustable instances per machine (1-120)
- **Support Plan Options**: 
  - No support
  - Business days (weekdays only)
  - 24/7 coverage
- **Professional Services**: Options for cluster design and deployment (1-2 clusters)
- **Volume Discounts**: Automatic tiered pricing:
  - 1-9 nodes: 0% discount
  - 10-24 nodes: 5% discount
  - 25-49 nodes: 10% discount
  - 50+ nodes: 15% discount

#### Export & Analysis
- **CSV Export**: Download detailed pricing breakdowns
- **Real-Time Calculation**: Instant updates as you adjust parameters

#### User Experience
- **Responsive Design**: Fully functional on desktop and mobile
- **Minimal Dependencies**: Pure HTML5, CSS, and JavaScript - no external libraries
- **Clean Interface**: Single-column layout optimized for readability
- **Accessibility**: Semantic HTML with ARIA labels

### 📋 Pricing Structure

| Component | Virtual | Physical |
|-----------|---------|----------|
| Base License | $500/node/year | $1,700/node/year |
| Business Days Support | +$1,200/node/year | +$1,200/node/year |
| 24/7 Support | +$2,900/node/year | +$2,900/node/year |
| Cluster Design (1st) | $60,000 | $60,000 |
| Cluster Design (2 clusters) | $90,000 | $90,000 |

### 🛠 Technical Details

- **Stack**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **No External Dependencies**: All calculations run client-side
- **Browser Support**: Chrome, Firefox, Safari, Edge (modern versions)
- **Performance**: Instant calculations on all parameter changes

### 📦 Included Files

- `index.html` - Main calculator interface (production version at root)
- `js/script.js` - Calculation engine and event handlers (production version at root)
- `css/styles.css` - Responsive styling
- `README.md` - Full documentation
- `RELEASE_NOTES.md` - This file
- `experimental-versions/` - Archive of earlier design iterations (v1, v2, v3)

### 🔄 Versioning

This is version **1.0.0**, the official stable release. The root directory contains the production-ready calculator. Earlier experimental versions are archived in `experimental-versions/` for reference.

### 🎯 Use Cases

- Quick TCO estimation for Anbox Cloud deployments
- Proposal generation with accurate pricing
- Cost analysis for different infrastructure configurations
- Support plan impact assessment

### 💡 Notable Capabilities

- Supports configurations from small test environments (1 node) to large enterprises (250+ nodes)
- Handles high-density scenarios up to 120 instances per machine
- Accurate discount calculations for volume purchases
- Export functionality for integration with reporting tools

### 🔄 What's Next

Future versions may include:
- Enhanced UI/UX improvements (see v2 directory)
- Additional deployment models
- Multi-currency support
- Advanced reporting features

### 📝 Notes

- All prices are in USD
- This is an estimation tool; actual pricing may vary based on specific deployment requirements
- Calculations are performed entirely in the browser - no data is sent to external servers
- Pricing data in this version is illustrative and should be confirmed with the Anbox sales team

### ✅ Validation

The calculator has been tested with:
- Various node counts (1 to 250+)
- Multiple density configurations
- All support plan combinations
- Different professional services tiers
- CSV export functionality

---

**For Support**: Contact the Anbox team for pricing inquiries or technical questions.
