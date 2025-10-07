import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const N2YO_API_KEY = process.env.N2YO_API_KEY;

app.use(cors());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Satellite Tracker API', 
    endpoints: {
      'GET /api/satellites/above': 'Get satellites above a location',
      'GET /api/satellites/positions': 'Get satellite positions over time'
    }
  });
});

// Proxy for /satellites/above
app.get('/api/satellites/above', async (req, res) => {
  const { lat, lng, alt, radius, category } = req.query;
  if (!lat || !lng || !alt || !radius || !category) {
    return res.status(400).json({ error: 'Missing required query parameters.' });
  }
  try {
    const url = `https://api.n2yo.com/rest/v1/satellite/above/${lat}/${lng}/${alt}/${radius}/${category}/&apiKey=${N2YO_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from N2YO.' });
  }
});

// Proxy for /satellites/positions
app.get('/api/satellites/positions', async (req, res) => {
  const { norad_id, lat, lng, alt, seconds } = req.query;
  if (!norad_id || !lat || !lng || !alt || !seconds) {
    return res.status(400).json({ error: 'Missing required query parameters.' });
  }
  try {
    const url = `https://api.n2yo.com/rest/v1/satellite/positions/${norad_id}/${lat}/${lng}/${alt}/${seconds}/&apiKey=${N2YO_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from N2YO.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
