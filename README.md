<div align="center">
<h1>INTERACTIVE MITRE TREE</h1>

An interactive visualization of the MITRE ATT&CK Framework using hierarchical tree structures
</div>

<div align="center">

[![Live Demo](https://img.shields.io/badge/live_demo-netlify-blue)](https://interactive-attack-matrix.netlify.app)
[![React](https://img.shields.io/badge/react-19.0.0-blue)]()
[![TypeScript](https://img.shields.io/badge/typescript-5.0+-blue)]()

</div>


## Built with the tools and technologies:

<div align="center">

[![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react)]()
[![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=flat-square&logo=typescript)]()
[![Material-UI](https://img.shields.io/badge/-Material--UI-black?style=flat-square&logo=mui)]()
[![D3.js](https://img.shields.io/badge/-D3.js-black?style=flat-square&logo=d3dotjs)]()

[![Netlify](https://img.shields.io/badge/-Netlify-red?style=flat-square&logo=netlify)]()
[![CSS3](https://img.shields.io/badge/-CSS3-red?style=flat-square&logo=css3)]()
[![JavaScript](https://img.shields.io/badge/-JavaScript-yellow?style=flat-square&logo=javascript)]()
[![Node.js](https://img.shields.io/badge/-Node.js-green?style=flat-square&logo=node.js)]()

[![npm](https://img.shields.io/badge/-npm-blue?style=flat-square&logo=npm)]()
[![Webpack](https://img.shields.io/badge/-Webpack-blue?style=flat-square&logo=webpack)]()
[![ESLint](https://img.shields.io/badge/-ESLint-purple?style=flat-square&logo=eslint)]()

</div>

## Overview

Interactive MITRE Tree transforms the complex MITRE ATT&CK framework into an intuitive, navigable tree visualization. Built with modern React and TypeScript, it provides cybersecurity professionals, researchers, and students with an interactive way to explore attack tactics, techniques, and real-world examples.

## Core Features

### 🌲 Interactive Tree Navigation
- **Hierarchical Visualization**: Navigate through MITRE ATT&CK framework using an intuitive tree structure
- **Smart Expand/Collapse**: Smooth animations with intelligent node management for large datasets
- **Multi-Row Layout**: Automatically organizes large numbers of child nodes into manageable rows
- **Zoom & Pan Controls**: Dynamic view adjustment with automatic centering on selected nodes

### 📋 Detailed Information Panels
- **Comprehensive Descriptions**: Full technique details with associated tactics and procedures
- **Detection Methods**: Integrated detection strategies and data sources for each technique
- **Real-Time Data**: Live fetching from MITRE ATT&CK API for up-to-date information
- **Cross-References**: Links between related techniques and tactics

### 🎭 Real-World Attack Examples
- **Historical Incidents**: Curated examples of actual cyberattacks using specific techniques
- **Attack Correlation**: Visual mapping between theoretical techniques and real-world applications
- **External Resources**: Direct links to detailed incident reports and analysis
- **Context Learning**: Bridge the gap between theory and practice

### 🎨 Modern User Experience
- **Material-UI Design**: Clean, professional interface with consistent design language
- **Responsive Layout**: Optimized for desktop, tablet, and mobile viewing
- **Custom Node Icons**: Emoji-based visual indicators for different attack types
- **Smooth Animations**: Fluid transitions and interactions throughout the application

## Quick Start

The easiest way to start the application:

```bash
npm start
```

This will start the development server and open the application in your browser at `http://localhost:3000`.

## Manual Setup

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GaiShukrun/Interactive-MITRE-Tree.git
   cd Interactive-MITRE-Tree
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

### Build for Production

Create an optimized production build:

```bash
npm run build
```

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **UI Components**: Material-UI for consistent design system
- **Visualization**: D3.js with react-d3-tree for interactive tree rendering
- **Data Source**: MITRE ATT&CK Framework API integration
- **Deployment**: Netlify with automatic builds from GitHub
- **Development**: Hot reloading with Create React App

## Key Components

### Tree Visualization
- **AttackTree**: Main component handling the interactive tree display with zoom, pan, and node management
- **Custom Node Rendering**: Emoji-based icons and dynamic sizing based on node types
- **Multi-Row Layout**: Intelligent organization of large datasets into manageable visual groups

### Information Display
- **ExampleModal**: Displays real-world attack examples with technique correlation
- **Detail Panels**: Comprehensive information about selected techniques including detection methods and data sources
- **Real-Time Updates**: Live data fetching from MITRE API for current threat intelligence

### User Experience
- **Responsive Design**: Optimized for desktop and mobile viewing
- **Smooth Animations**: Fluid transitions between tree states and information panels
- **Accessibility**: Screen reader support and keyboard navigation

## Development Features

### Hot Reloading
- Automatic refresh when files change during development
- Fast rebuild times with optimized webpack configuration

### Type Safety
- Full TypeScript support with comprehensive type definitions
- Custom interfaces for MITRE ATT&CK data structures
- Compile-time error checking for better code quality

## Contributing

Please read our contributing guidelines before submitting pull requests to the project.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
