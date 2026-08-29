const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/ai", async (req, res) => {
  const { prompt } = req.body;

  // TODO: vervang dit met echte AI‑API (Gemini / Groq / OpenAI)
  const reply = `Jarvis: ik heb je prompt ontvangen: "${prompt}"`;

  res.json({ reply });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Jarvis backend running on port ${PORT}`));
