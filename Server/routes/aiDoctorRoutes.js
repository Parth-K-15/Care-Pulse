import axios from "axios";
import express from "express";
const router = express.Router();

// POST /api/ai-doctor
router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Example: Use OpenAI API (replace with your API key and endpoint)
  try {
    // Replace with your actual OpenAI API key and endpoint
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an empathetic doctor. Help the patient with their symptoms and book appointments if needed." },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: "AI doctor service failed." });
  }
});

export default router;
