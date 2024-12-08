const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS middleware
const axios = require('axios');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors()); // Allow all origins

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Simple POST route
app.post('/submit', (req, res) => {
    const data = req.body;
    postData(data);

    console.log('Received Data:', data.name);

    res.status(200).json({
        message: 'Data received successfully',
        receivedData: data
    });
});

// Start the server

async function postData(val) {
    const url = 'https://script.google.com/macros/s/AKfycbwB620jtaweY8k9lIz4aQU-CdH96FHnG1nW8FldizksEQSYHNzcpmwaiStOghpg9ooe/exec'; // Replace with your Apps Script web app URL
  
    const data = {
      name: val.name,
      email: val.email,
      message: val.message,
    };
  
    try {
      const response = await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  }
  


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
