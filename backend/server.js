import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Gemini client
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// AI endpoint
app.post("/api/ai", async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "system",
          parts: [
            {
              text: "Je bent Jarvis, een slimme, formele, futuristische AI-assistent. Antwoord duidelijk, efficiënt en met een vleugje persoonlijkheid."
            }
          ]
        },
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    });

    const reply = result.response.text();
    res.json({ reply });
  } catch (error) {
    console.error("Gemini fout:", error);
    res.json({ reply: "Jarvis: Er ging iets mis met de AI-module." });
  }
});

// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Jarvis backend actief op poort ${PORT}`);
});
