const express = require('express');
const path = require('path');
const app = express();

// INCLUDE BUILD FORDER WITH THE SERVER FOLDER & node index.js

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8000, () => {
  console.log(`Server running on: http://localhost:8000`)
});