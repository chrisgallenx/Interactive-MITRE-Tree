# Interactive MITRE Tree

An interactive visualization of the MITRE ATT&CK Matrix using a tree-based structure, built with React and TypeScript.

🌐 **Live Demo**: [https://interactive-attack-matrix.netlify.app](https://interactive-attack-matrix.netlify.app)

## Features

- Hierarchical tree visualization of the MITRE ATT&CK Matrix
- Interactive expand/collapse functionality for tactics and techniques
- Real-world examples modal with detailed attack scenarios
- Clean and intuitive user interface with Material-UI components
- TypeScript support for better development experience

## Prerequisites

- Node.js (v16 or higher)
- npm (included with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GaiShukrun/Interactive-MITRE-Tree.git
   cd Interactive-MITRE-Tree
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

To start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Build

To create a production build:

```bash
npm run build
```

## Project Structure

- `/src`
  - `/components` - React components (AttackTree, ExampleModal)
  - `/types` - TypeScript type definitions for attack data
  - `/data` - MITRE ATT&CK Matrix data and real-world examples
  - `/styles` - CSS and styling files for tree visualization
  - `/utils` - Utility functions for MITRE data fetching

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
