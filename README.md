# 🌳 Interactive MITRE Tree

<img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
<img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/Material--UI-6.4.5-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="Material-UI">
<img src="https://img.shields.io/badge/D3.js-7.9.0-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white" alt="D3.js">

**An interactive visualization of the MITRE ATT&CK Framework using hierarchical tree structures**

[🚀 Live Demo](https://interactive-attack-matrix.netlify.app) • [📖 Documentation](#-features) • [🤝 Contributing](#-contributing)

<img src="https://img.shields.io/github/stars/GaiShukrun/Interactive-MITRE-Tree?style=social" alt="GitHub stars">
<img src="https://img.shields.io/github/forks/GaiShukrun/Interactive-MITRE-Tree?style=social" alt="GitHub forks">
<img src="https://img.shields.io/github/watchers/GaiShukrun/Interactive-MITRE-Tree?style=social" alt="GitHub watchers">

---

## 🎯 Overview

Interactive MITRE Tree is a cutting-edge web application that transforms the complex MITRE ATT&CK framework into an intuitive, navigable tree visualization. Built with modern React and TypeScript, it provides cybersecurity professionals, researchers, and students with an interactive way to explore attack tactics, techniques, and real-world examples.

### 🌟 Why Interactive MITRE Tree?

- **🔍 Visual Learning**: Transform complex cybersecurity frameworks into digestible visual hierarchies
- **📊 Real-World Context**: Connect theoretical techniques with actual attack scenarios
- **⚡ Performance**: Optimized rendering for large datasets with smart multi-row layouts
- **🎨 Modern UX**: Clean, responsive interface built with Material-UI design principles
- **🔧 Developer-Friendly**: Full TypeScript support with comprehensive documentation

---

## ✨ Features

<table>
<tr>
<td>

### 🌲 Interactive Tree Navigation
- Hierarchical visualization of MITRE ATT&CK framework
- Smooth expand/collapse animations
- Smart zoom and pan functionality
- Multi-row layout for large datasets

</td>
<td>

### 📋 Detailed Information Panels
- Comprehensive technique descriptions
- Associated detection methods
- Data sources and references
- Real-time data fetching from MITRE API

</td>
</tr>
<tr>
<td>

### 🎭 Real-World Examples
- Modal dialogs with actual attack scenarios
- Historical incident references
- Technique correlation mapping
- External resource links

</td>
<td>

### 🎨 Modern UI/UX
- Material-UI component library
- Responsive design for all devices
- Custom emoji-based node icons
- Smooth transitions and animations

</td>
</tr>
</table>

---

## 🏗️ Project Structure

```
Interactive-MITRE-Tree/
├── 📁 public/                 # Static assets
│   ├── index.html            # Main HTML template
│   └── favicon.ico           # Application icon
├── 📁 src/                   # Source code
│   ├── 📁 components/        # React components
│   │   ├── AttackTree.tsx    # Main tree visualization component
│   │   └── ExampleModal.tsx  # Real-world examples modal
│   ├── 📁 data/             # Static data files
│   │   ├── attackData.ts     # MITRE ATT&CK data structures
│   │   └── realWorldExamples.ts # Historical attack examples
│   ├── 📁 styles/           # CSS styling
│   │   └── tree.css         # Tree-specific styles
│   ├── 📁 types/            # TypeScript definitions
│   │   └── attack.ts        # Type definitions for attack data
│   ├── 📁 utils/            # Utility functions
│   │   └── mitreFetch.ts    # MITRE API integration
│   └── App.tsx              # Root application component
├── 📄 package.json          # Project dependencies
├── 📄 tsconfig.json         # TypeScript configuration
└── 📄 netlify.toml          # Deployment configuration
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GaiShukrun/Interactive-MITRE-Tree.git
   cd Interactive-MITRE-Tree
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:3000` to see the application running.

### Build for Production

Create an optimized production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `build/` directory.

---

## 🧪 Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

For coverage reports:

```bash
npm run test:coverage
# or
yarn test:coverage
```

---

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.0.0 | Frontend framework |
| **TypeScript** | 5.0+ | Type safety and developer experience |
| **Material-UI** | 6.4.5 | UI component library |
| **D3.js** | 7.9.0 | Data visualization |
| **react-d3-tree** | 3.6.5 | Tree visualization component |
| **Netlify** | - | Deployment and hosting |

---

## 🎨 Customization

### Styling

The application uses a combination of Material-UI theming and custom CSS:

- **Theme Configuration**: `src/App.tsx`
- **Tree Styles**: `src/styles/tree.css`
- **Component Styles**: Inline with Material-UI's `sx` prop

### Data Sources

- **Static Data**: `src/data/attackData.ts`
- **Real-World Examples**: `src/data/realWorldExamples.ts`
- **API Integration**: `src/utils/mitreFetch.ts`

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Process

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines

- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Issues and Bug Reports

Found a bug? Have a feature request? Please [open an issue](https://github.com/GaiShukrun/Interactive-MITRE-Tree/issues) with:

- Clear description of the problem or feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots (if applicable)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **MITRE Corporation** for the ATT&CK framework
- **React D3 Tree** community for the visualization library
- **Material-UI** team for the component library
- All contributors and users of this project

---

## 📊 Project Stats

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/GaiShukrun/Interactive-MITRE-Tree?style=flat-square)
![GitHub code size](https://img.shields.io/github/languages/code-size/GaiShukrun/Interactive-MITRE-Tree?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/GaiShukrun/Interactive-MITRE-Tree?style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/GaiShukrun/Interactive-MITRE-Tree?style=flat-square)

</div>

---

<div align="center">

**[⬆ Back to Top](#-interactive-mitre-tree)**

Made with ❤️ by [Gai Shukrun](https://github.com/GaiShukrun)

</div>
