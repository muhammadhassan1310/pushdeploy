const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const projectName = process.env.PROJECT_NAME || 'Default Project';

// Create a write stream (in append mode) for logging
const logFileStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Setup morgan to log requests to the console and the file
app.use(morgan('combined', { stream: logFileStream }));

// Sample route
app.get('/', (req, res) => {
  res.send(`Hello, world! Abu zar Project Name is : ${projectName}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  // Log the error to the console
  console.error(err.stack);
  // Log the error to the file
  fs.appendFileSync(path.join(__dirname, 'access.log'), `${new Date().toISOString()} - Error: ${err.stack}\n`);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is ${projectName} running on port ${port}`);
});
  