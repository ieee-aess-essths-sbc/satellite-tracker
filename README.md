# Satellite Tracker

A real-time satellite tracking application that visualizes satellites orbiting Earth using a 3D globe interface.

## Features

- 3D globe visualization using react-globe.gl
- Real-time satellite position data from N2YO API
- 3D satellite models
- Interactive satellite selection
- Responsive fullscreen design

## Tech Stack

- **Frontend**: React, Vite, Three.js, react-globe.gl
- **Backend**: Node.js, Express, N2YO API
- **Deployment**: Frontend on Vercel, Backend on Render

## Development Setup

### Prerequisites

- Node.js (v14 or higher)
- N2YO API key (get from [n2yo.com](https://www.n2yo.com/api/))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ieee-aess-essths-sbc/satellite-tracker.git
cd satellite-tracker
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd server
npm install
```

4. Set up environment variables:
```bash
# In server/.env
N2YO_API_KEY=your_n2yo_api_key_here
PORT=5000
```

5. Start the backend server:
```bash
cd server
npm start
```

6. Start the frontend development server:
```bash
npm run dev
```

## Deployment

### Backend Deployment (Render)

1. Push your code to GitHub
2. Connect your GitHub repo to Render
3. Render will automatically detect the `render.yaml` configuration
4. Set the `N2YO_API_KEY` environment variable in Render dashboard
5. Deploy the service

### Frontend Deployment (Vercel)

1. Connect your GitHub repo to Vercel
2. Set environment variable in Vercel dashboard:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://your-app.onrender.com`)
3. Deploy the frontend

## Environment Variables

### Backend (.env)
- `N2YO_API_KEY`: Your N2YO API key
- `PORT`: Server port (default: 5000)

### Frontend (.env.local for development)
- `VITE_API_URL`: Backend API URL (http://localhost:5000 for local development)

### Frontend (.env for production)
- `VITE_API_URL`: Your deployed backend URL

## API Endpoints

- `GET /api/satellites/above`: Get satellites above a location
- `GET /api/satellites/positions`: Get satellite positions over time

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
