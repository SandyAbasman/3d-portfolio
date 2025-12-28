# 3D Portfolio - Next.js/React

A modern 3D portfolio website built with Next.js and React, featuring an interactive rotating cube interface.

## Features

- 🎨 3D rotating cube interface
- ⚛️ Built with Next.js 14 and React
- 📱 Responsive design
- 🎯 TypeScript support
- 🚀 Optimized for performance

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── components/
│   │   ├── Cube.tsx      # 3D cube component with all faces
│   │   └── Menu.tsx      # Navigation menu component
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript configuration
```

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- CSS3 (3D Transforms)
- Font Awesome Icons

## License

MIT

