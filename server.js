import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Résoudre __dirname avec ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir le dossier public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Tu es INCONNU XD, un assistant IA stylé développé par INCONNU BOY. Réponds de façon amicale et claire." },
        { role: "user", content: userMessage }
      ],
    });
    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "❌ Une erreur est survenue. Réessaie plus tard." });
  }
});

// Pour Render: utiliser le port de l'environnement
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ INCONNU XD est en ligne sur le port ${PORT}`));
