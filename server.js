import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Résoudre __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Tu es INCONNU XD, un assistant développé par INCONNU BOY." },
        { role: "user", content: userMessage }
      ],
    });
    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Une erreur est survenue. Réessaie plus tard." });
  }
});

// Pour Render : utiliser PORT défini par l'environnement
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ INCONNU XD lancé sur le port ${PORT}`));
