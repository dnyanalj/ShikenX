const express = require('express');
const router = express.Router();
const { createTest, listTests ,getTestResults,deleteTest,generateAIExam} = require('../controllers/examinerController');

router.post('/create-test', createTest);
router.post('/create-test-ai', generateAIExam);
router.get('/tests', listTests);
router.get('/test/:testId/results', getTestResults);
router.delete("/test/:testId", deleteTest);

module.exports = router;
