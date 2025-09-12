const express = require('express');

const path = require('path');


const app = express();

const port = process.env.PORT || 3000;


// Disable static middleware for now to test routing

// app.use(express.static(path.join(__dirname, 'dist')));


// Explicit root route with detailed logging

app.get('/', (req, res) => {

  console.log(`Root request received - Method: ${req.method}, URL: ${req.url}, Headers: ${JSON.stringify(req.headers)}`);

  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {

    if (err) {

      console.error('Error serving index.html:', err);

      res.status(500).send('Server error');

    }

  });

});


// Fallback for all routes with detailed logging

app.get('*', (req, res) => {

  console.log(`Wildcard request for ${req.path} - Method: ${req.method}, URL: ${req.url}, Headers: ${JSON.stringify(req.headers)}`);

  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {

    if (err) {

      console.error('Error serving index.html:', err);

      res.status(500).send('Server error');

    }

  });

});


app.listen(port, () => {

  console.log(`Server running on http://localhost:${port}`);

}).on('error', (err) => {

  console.error('Server error:', err.message);

});
