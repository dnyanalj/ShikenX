import prisma from "../config/db.js";
import axios from "axios";
// import OpenAI from "openai";

// Initialize OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

function extractJSON(text) {
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1) return null;
  return text.slice(firstBrace, lastBrace + 1);
}


export async function createTest(req, res) {
  if (req.user.role !== "EXAMINER")
    return res.status(403).json({ error: "Forbidden" });

  const { title, scheduledAt, questions } = req.body;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const test = await tx.test.create({
        data: {
          title,
          scheduledAt,
          examiner: { connect: { id: req.user.userId } },
        },
      });

      for (const q of questions) {
        const createdQuestion = await tx.question.create({
          data: {
            text: q.text,
            testId: test.id,
            options: {
              create: q.options.map((o) => ({ text: o })),
            },
          },
          include: { options: true },
        });

        if (typeof q.answerIndex === "number") {
          await tx.question.update({
            where: { id: createdQuestion.id },
            data: {
              answerId: createdQuestion.options[q.answerIndex].id,
            },
          });
        }
      }
      return test;
    });

    res.json({ test: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function generateAIExam(req, res) {
  try {
    console.log("1");
    if (req.user?.role !== "EXAMINER") {
      return res.status(403).json({ error: "Forbidden" });
    }
    console.log("2");
    const { prompt } = req.body;

    if (!prompt || prompt.trim().length < 5) {
      return res.status(400).json({ error: "Valid prompt required" });
    }
    console.log("3");

    const systemPrompt = `
You are an exam paper generator.
Return ONLY valid JSON.
Each question must have 4 options.
answerIndex must be correct (0-3).
`;

    // const completion = await openai.chat.completions.create({
    //   model: "gpt-4o-mini",
    //   messages: [
    //     { role: "system", content: systemPrompt },
    //     { role: "user", content: prompt },
    //   ],
    //   temperature: 0.2,
    // });

    // const raw = completion.choices[0].message.content;
    // const parsed = JSON.parse(raw);

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct", // FREE & GOOD
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:4000", // required by OpenRouter
          "X-Title": "AI Exam Generator",
        },
      }
    );

    console.log("4");
    // console.log("OPENROUTER RESPONSE:", response.data);

    const raw = response.data.choices[0].message.content;

    const jsonText = extractJSON(raw);

    if (!jsonText) {
      console.error("NO JSON FOUND IN AI RESPONSE 👉", raw);
      return res.status(500).json({
        error: "AI response did not contain JSON",
      });
    }
    
    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      console.log("INVALID JSON RESPONSE");
      return res.status(500).json({
        error: "AI returned invalid JSON",
        raw,
      });
    }
    console.log("5");
    res.json(parsed);
  } catch (err) {
    console.error("OPENROUTER ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "AI exam generation failed" });
  }
}

export async function listTests(req, res) {
  const tests = await prisma.test.findMany({
    where: { examinerId: req.user.userId },
    include: { questions: true },
  });
  res.json({ tests });
}

export async function getTestResults(req, res) {
  const { testId } = req.params;

  const test = await prisma.test.findUnique({
    where: { id: Number(testId) },
    include: {
      questions: true,
      attempts: { include: { candidate: true } },
    },
  });

  if (!test) return res.status(404).json({ error: "Test not found" });

  const results = test.attempts.map((a) => ({
    candidateId: a.candidate.id,
    candidateName: a.candidate.name || a.candidate.username,
    score: a.score ?? 0,
    totalQuestions: test.questions.length,
    status: a.status,
  }));

  res.json({ testTitle: test.title, results });
}

export async function deleteTest(req, res) {
  const { testId } = req.params;

  const test = await prisma.test.findUnique({
    where: { id: Number(testId) },
  });

  if (!test) return res.status(404).json({ error: "Test not found" });
  if (test.examinerId !== req.user.userId)
    return res.status(403).json({ error: "Not authorized" });

  await prisma.test.delete({ where: { id: Number(testId) } });

  res.json({ message: "Test deleted successfully" });
}
