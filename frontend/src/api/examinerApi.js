import axiosClient from './axios.js';

export const createTest = (testData) =>
    axiosClient.post('/examiner/create-test', testData);

export const generateExamFromAI = (prompt) =>
    axiosClient.post('/examiner/create-test-ai', { prompt });

export const getAllTests = () =>
    axiosClient.get('/examiner/tests');

export const getTestResults = (testId) =>
    axiosClient.get(`/examiner/test/${testId}/results`);

export const deleteTest = (testId) =>
    axiosClient.delete(`/examiner/test/${testId}`);