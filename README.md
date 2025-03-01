# Playbooks Website

A companion website for the Playbooks Python package, featuring a landing page, documentation, and an interactive playground.

## Features

- **Landing Page**: Information about the Playbooks package and its features
- **Playground**: Interactive environment to create, edit, and run Playbooks
- **Documentation**: Guides and API reference for using Playbooks
- **Trace Viewer**: Visualize the execution trace of your Playbooks

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Python with FastAPI (for running Playbooks)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+ (for the backend)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/playbooks-website.git
cd playbooks-website
```

2. Install frontend dependencies:

```bash
npm install
```

3. Install the Playbooks package:

```bash
pip install playbooks
```

### Development

1. Start the frontend development server:

```bash
npm run dev
```

2. In a separate terminal, start the backend server (to be implemented):

```bash
# To be implemented
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app`: Next.js app router pages
- `src/components`: React components
  - `ui`: UI components from shadcn/ui
  - `playground`: Components for the playground
  - `trace-viewer`: Components for the trace viewer
- `src/lib`: Utility functions and state management
- `src/app/api`: API routes for communicating with the backend

## Deployment

The website can be deployed to Render.com:

1. Connect your GitHub repository to Render
2. Create a new Web Service for the frontend
3. Set the build command to `npm run build`
4. Set the start command to `npm start`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Playbooks](https://github.com/yourusername/playbooks) - The Python package this website is built for
- [Next.js](https://nextjs.org/) - The React framework used
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
