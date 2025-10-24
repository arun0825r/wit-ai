const express = require("express");
const fetch = require("node-fetch");
const { getReply } = require("./replies");

const app = express();
app.use(express.json());

const WIT_TOKEN = "A7CY4SSGORDFO2FNN5PLPVY3ZWCIT33O"; // Replace with your actual Wit.ai token
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.post("/message", async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await fetch(`https://api.wit.ai/message?v=20241022&q=${encodeURIComponent(userMessage)}`, {
      headers: {
        Authorization: `Bearer ${WIT_TOKEN}`,
      },
    });
    const data = await response.json();
    // Example: extract intent and reply, adjust as per your actual Wit.ai response
    const intent = data.intents && data.intents.length > 0 ? data.intents[0].name : "unknown";
    const reply = getReply(intent);
    res.json({ intent, reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});









