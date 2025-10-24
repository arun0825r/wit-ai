import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import { getReply } from "./replies.js";

const app = express();
app.use(cors());
app.use(express.json());

const WIT_TOKEN = "A7CY4SSGORDFO2FNN5PLPVY3ZWCIT33O"; // replace this
app.get('/', (req, res) => {
  res.send('Wit.ai Node.js API is running!');
});

app.post("/message", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const witResponse = await fetch(
      `https://api.wit.ai/message?v=20241022&q=${encodeURIComponent(userMessage)}`,
      {
        headers: { Authorization: `Bearer ${WIT_TOKEN}` },
      }
    );

    const data = await witResponse.json();
    const intent = data.intents?.[0]?.name || "unknown";

    console.log("User:", userMessage);
    console.log("Intent:", intent);

    // Get random reply from replies.js
    const randomReply = getReply(intent);

    res.json({ reply: randomReply, intent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});





