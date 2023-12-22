// server.js
import express from 'express';

const app = express();
const port = 3000;

app.get('/scrape', async (req, res) => {
  try {
    console.log('here');
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 500));
    res.json({ message: 'Response sent' });
  } catch (error) {
    console.error('Error scraping data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
