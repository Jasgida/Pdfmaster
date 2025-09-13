const express = require('express');

const path = require('path');

const app = express();


const port = process.env.PORT || 3000;


// Serve static files from /public (where Docker copies dist)

app.use(express.static(path.join(__dirname, 'public')));


// API health check

app.get('/api/health', (req, res) => {

  res.json({ status: 'ok', message: 'Backend running' });

});


// React fallback

app.get('*', (req, res) => {

  res.sendFile(path.join(__dirname, 'public', 'index.html'));

});


app.listen(port, () => {

  console.log(`Server running on http://localhost:${port}`);

});

