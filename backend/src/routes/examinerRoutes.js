const express = require('express');
const router = express.Router();
const { createTest, listTests ,getTestResults,deleteTest} = require('../controllers/examinerController');

router.post('/create-test', createTest);
router.get('/tests', listTests);
router.get('/test/:testId/results', getTestResults);
router.delete("/test/:testId", deleteTest);

module.exports = router;
