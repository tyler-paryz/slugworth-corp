# Slugworth Corp - Pendo Testing Application

This is a single-page Vue.js application designed for testing Pendo analytics integration. The application is themed around "Slugworth Corp," a fictional candy company from Willy Wonka.

## Features

- Fully integrated Pendo analytics for visitor tracking
- Multiple interactive components (buttons, forms, modals)
- Responsive design
- Multiple page views via Vue Router
- Product catalog with filtering and search
- Contact form with validation
- User events tracked with Pendo

## Technology Stack

- Vue 3 (Composition API)
- Vue Router 4
- Vite
- Vanilla CSS (no frameworks)

## Getting Started

### Prerequisites

- Node.js (14.x or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/slugworth-corp.git
cd slugworth-corp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory, ready to be deployed to Vercel or any other static hosting service.

## Deployment

This application is designed to be hosted on Vercel. To deploy:

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

## Pendo Integration

Pendo is already integrated into this application. The initialization script is in `index.html` and visitor tracking is set up in `main.js`. The application tracks:

- Page views
- Button clicks
- Form interactions
- Product browsing
- Feature usage

## License

ISC 