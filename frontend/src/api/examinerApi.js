import axiosClient from './axios.js';

export const createTest = (testData) =>
    axiosClient.post('/examiner/create-test', testData);

export const getAllTests = () =>
    axiosClient.get('/examiner/tests');

export const getTestResults = (testId) =>
    axiosClient.get(`/examiner/test/${testId}/results`);

export const deleteTest = (testId) =>
    axiosClient.delete(`/examiner/test/${testId}`);