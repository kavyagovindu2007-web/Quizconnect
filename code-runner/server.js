const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "https://quizconnect-qdty.onrender.com"
  ]
}));

app.use(express.json({ limit: "30kb" }));

// Supported languages
const languages = {
  python: "python3",
  c: "c",
  cpp: "cpp",
  java: "java"
};

// Health check
app.get("/", (req, res) => {
  res.send("QuizConnect Code Runner is running!");
});

// Run code
app.post("/run", async (req, res) => {

  try {
    const { language, code, input = "" } = req.body;

    if (!languages[language]) {
      return res.status(400).json({
        error: "Unsupported language."
      });
    }

    if (typeof code !== "string" || !code.trim() || code.length > 20000) {
      return res.status(400).json({
        error: "Code must contain 1–20,000 characters."
      });
    }

    if (typeof input !== "string" || input.length > 10000) {
      return res.status(400).json({
        error: "Invalid program input."
      });
    }

    if (!process.env.JDOODLE_CLIENT_ID ||
        !process.env.JDOODLE_CLIENT_SECRET) {
      return res.status(500).json({
        error: "Code execution service is not configured."
      });
    }

    const response = await fetch(
      "https://api.jdoodle.com/v1/execute",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clientId: process.env.JDOODLE_CLIENT_ID,
          clientSecret: process.env.JDOODLE_CLIENT_SECRET,
          script: code,
          stdin: input,
          language: languages[language],
          versionIndex: "0"
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return res.status(502).json({
        error: "Code execution service request failed."
      });
    }

    res.json(result);

  } catch (error) {
    console.error("Code Runner Error:", error.message);

    res.status(500).json({
      error: "Unable to execute the program."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`QuizConnect Code Runner running on port ${PORT}`);
});