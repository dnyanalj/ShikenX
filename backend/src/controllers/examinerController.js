const prisma = require('../prisma');

async function createTest(req, res) {
  try {
    if (req.user.role !== 'EXAMINER') return res.status(403).json({ error: 'Forbidden' });
    const { title, scheduledAt, questions } = req.body;
      
    // create test
    const test = await prisma.test.create({
      data: {
        title,
        scheduledAt,
        examiner: { connect: { id: req.user.userId } },
        questions: {
          create: questions.map(q => ({
            text: q.text,
            options: { create: q.options.map(o => ({ text: o })) },
            // answerId set later after options are created — we'll set via a transaction
          }))
        }
      },
      include: { questions: { include: { options: true } } }
    });

    // If questions include answerIndex, update answerId
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (typeof q.answerIndex === 'number') {
        const option = test.questions[i].options[q.answerIndex];
        if (option) {
          await prisma.question.update({ where: { id: test.questions[i].id }, data: { answerId: option.id } });
        }
      }
    }

    res.json({ test });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function listTests(req, res) {
  const tests = await prisma.test.findMany({ where: { examinerId: req.user.userId }, include: { questions: true } });
  res.json({ tests });
}

async function getTestResults(req, res) {
  const { testId } = req.params;

  try {
    const test = await prisma.test.findUnique({
      where: { id: Number(testId) },
      include: {
          questions: true, 
          attempts: {
          include: {
            candidate: true,
          },
        },
      },
    });

    if (!test) return res.status(404).json({ error: "Test not found" });
    console.log("Fetched test:", test);
    const results = test.attempts.map((a) => ({
      candidateId: a.candidate.id,
      candidateName: a.candidate.name || a.candidate.username,
      score: a.score ?? 0,
      totalQuestions: test.questions?.length || 1,
      status: a.status,
    }));
    console.log("Test results:", results);
    res.json({
      testTitle: test.title,
      results,
    });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch test results" });
  }
}

// 
async function deleteTest(req, res) {
  const { testId } = req.params;
  try {
     console.log("DELETE HIT");
    console.log("Params:", req.params);
    console.log("User:", req.user);
    const test = await prisma.test.findUnique({
      where: { id: Number(testId) },
    });
      console.log("Found test:", test);
    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }

    // 2️⃣ Authorization check
    if (test.examinerId !== req.user.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // 3️⃣ Delete test (cascade deletes everything related)
    await prisma.test.delete({
      where: { id: Number(testId) },
    });

    res.json({ message: "Test deleted successfully" });
  } catch (err) {
     console.error("DELETE ERROR 👉", err);
    res.status(500).json({ error: "Failed to delete test" });
  }
}

module.exports = { createTest, listTests ,getTestResults, deleteTest};
