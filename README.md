# Project Pages

A Next.js-based static site generator for publishing project documentation pages on Vercel.

## Features

- 📝 **Markdown Support**: Write documentation in markdown with frontmatter
- 🎨 **Tailwind CSS**: Beautiful, responsive design out of the box
- 🚀 **Static Generation**: Fast loading times with Next.js static export
- 🔍 **Syntax Highlighting**: Code blocks with Prism.js highlighting
- 📱 **Mobile Responsive**: Works perfectly on all devices
- ⚡ **Vercel Ready**: Optimized for Vercel deployment

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Your Content

Create markdown files in the `content/projects/` directory:

```markdown
---
title: My Awesome Project
description: A brief description of what this project does
date: 2024-01-15
---

# My Awesome Project

Your project documentation goes here...
```

### 3. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

### 4. Build for Production

```bash
npm run build
```

This generates static files in the `out/` directory.

## Deployment on Vercel

### Method 1: GitHub Integration (Recommended)

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repository
4. Vercel will automatically detect it's a Next.js project
5. Click "Deploy" - that's it!

### Method 2: Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to configure your deployment