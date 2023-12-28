// server.js
import express from 'express';
import { scrapData } from './src/index';

const app = express();
const port = 3000;


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins (replace '*' with your specific origin if needed)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  // Continue to the next middleware
  next();
});

app.get('/scrape', async (req, res) => {
  try {
    // Simulate a delay
    // await new Promise(resolve => setTimeout(resolve, 500));
    const fetchData = await scrapData();
    res.json(fetchData);
  } catch (error) {
    console.error('Error scraping data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
