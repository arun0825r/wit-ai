const express = require('express');
const { Wit, log } = require('node-wit');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies
// Serve static files from current directory
app.use(express.static(__dirname));

// Handle root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Load replies.json dynamically
function getReplies() {
    return JSON.parse(fs.readFileSync('./replies.json'));
}

// Wit.ai client setup
const witClient = new Wit({ accessToken: 'A7CY4SSGORDFO2FNN5PLPVY3ZWCIT33O' });

// Endpoint to handle message from frontend
app.post('/message', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await witClient.message(message);
        const intents = response.intents && Object.keys(response.intents);
        let intent = intents && intents[0]; // Simplified intent extraction
        let replies = getReplies();

        // Select a random reply based on intent
        const replyList = replies[intent] || ["Sorry, I didn't understand that."];
        const reply = replyList[Math.floor(Math.random() * replyList.length)];
        res.json({ reply });
    } catch (error) {
        res.status(500).json({ error: 'Error processing message' });
    }
});

// Serve static files (like index.html)
app.use(express.static('.'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



