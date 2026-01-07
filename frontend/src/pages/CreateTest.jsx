import React, { useState } from "react";
import { createTest, generateExamFromAI } from "../api/examinerApi";
import QuestionModal from "./QuestionModal.jsx";
import { useNavigate } from "react-router-dom";
import SideBar from "@/components/layout/SideBar.jsx";
import Navbar from "@/components/layout/NavBar.jsx";

function CreateTest() {
  const [title, setTitle] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const navigate = useNavigate();

  const handleSaveQuestion = (questionData) => {
    if (editingIndex !== null) {
      setQuestions((prev) =>
        prev.map((q, idx) => (idx === editingIndex ? questionData : q))
      );
      setEditingIndex(null);
    } else {
      setQuestions((prev) => [...prev, questionData]);
    }
    setShowModal(false);
  };

  const handleGenerateAIQuestions = async () => {
    if (!aiPrompt.trim()) return;

    try {
      setIsGenerating(true);
      console.log("before call", aiPrompt);
      const res = await generateExamFromAI(aiPrompt);
      
      // questions{
      //  {question, options[], answerIndex},
      //  {question, options[], answerIndex},
      //  {question, options[], answerIndex},
      //  }

      console.log("after call");
      console.log("AI Generated Questions Response:", res.data);
      console.log("Extracted Questions:", res.data);
      // 
      const { questions } = res.data;
      const normalizedQuestions = questions.map((q) => ({
        text: q.text || q.question, // 👈 KEY FIX
        options: q.options,
        answerIndex: q.answerIndex,
      }));
      setQuestions(normalizedQuestions);
    } catch (err) {
      console.error(err);
      alert("Failed to generate questions using AI");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteQuestion = (idx) => {
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleEditQuestion = (idx) => {
    setEditingIndex(idx);
    setShowModal(true);
  };

  const handleCreateTest = async () => {
    if (!title.trim() && questions.length === 0) {
      alert("Please enter a title and add at least one question.");
      return;
    }
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }
    if (questions.length === 0) {
      alert("Please add at least one question.");
      return;
    }
    try {
      const utcIso = new Date(scheduledAt).toISOString();
      const payload = { title, scheduledAt: utcIso, questions };
      const res = await createTest(payload);
      alert("✅ Test created successfully!");
      console.log("payload :", payload);
      setTitle("");
      setScheduledAt("");
      setQuestions([]);
      navigate("/examiner/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create test");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <SideBar role="examiner" />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-8">
          <div className="max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                Create New Test
              </h1>
              <p className="text-slate-600">
                Design and schedule your examination with AI assistance
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Test Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Test Information Card */}
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-8 border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></span>
                    Test Information
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Test Title
                      </label>
                      <input
                        type="text"
                        placeholder="Enter a descriptive title for your test"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Schedule Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={scheduledAt}
                        onChange={(e) => setScheduledAt(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800"
                      />
                      <p className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Students can start the test within 10 minutes from
                        scheduled time
                      </p>
                    </div>
                  </div>
                </div>

                {/* Questions List */}
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-8 border border-slate-200">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full"></span>
                      Questions
                      <span className="ml-2 px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-full">
                        {questions.length}
                      </span>
                    </h2>
                  </div>

                  {questions.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-10 h-10 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-slate-500 font-medium">
                        No questions added yet
                      </p>
                      <p className="text-slate-400 text-sm mt-1">
                        Add questions manually or generate them with AI
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {questions.map((q, i) => (
                        <div
                          key={i}
                          className="group bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border-2 border-slate-200 hover:border-blue-300 transition-all"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                                {i + 1}
                              </span>
                              <p className="font-semibold text-slate-800 text-lg">
                                {q.text}
                              </p>
                            </div>
                          </div>

                          <div className="ml-11 space-y-2">
                            {q.options.map((opt, idx) => {
                              const isAnswer = q.answerIndex === idx;
                              return (
                                <div
                                  key={idx}
                                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                                    isAnswer
                                      ? "bg-emerald-50 border-emerald-400 text-emerald-800"
                                      : "bg-white border-slate-200 text-slate-700"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    {isAnswer && (
                                      <svg
                                        className="w-5 h-5 text-emerald-600 flex-shrink-0"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    )}
                                    <span
                                      className={
                                        isAnswer ? "font-semibold" : ""
                                      }
                                    >
                                      {opt}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="ml-11 mt-4 flex gap-2">
                            <button
                              onClick={() => handleEditQuestion(i)}
                              className="px-4 py-2 bg-white border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-all flex items-center gap-2"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteQuestion(i)}
                              className="px-4 py-2 bg-white border-2 border-red-500 text-red-600 rounded-lg hover:bg-red-50 font-medium transition-all flex items-center gap-2"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setShowModal(true)}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Add Question
                    </button>

                    <button
                      onClick={handleCreateTest}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 font-semibold transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Create Test
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - AI Generator */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl shadow-xl shadow-purple-500/30 p-8 text-white sticky top-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">AI Assistant</h3>
                      <p className="text-purple-200 text-sm">
                        Generate questions instantly
                      </p>
                    </div>
                  </div>

                  <p className="text-purple-100 text-sm mb-6 leading-relaxed">
                    Describe your test requirements and let our AI create
                    professional questions for you in seconds.
                  </p>

                  <div className="space-y-4">
                    <textarea
                      placeholder="e.g., Generate 5 MCQs on Database Management Systems covering normalization, SQL queries, and transactions..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      rows={5}
                      className="w-full p-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl focus:outline-none focus:border-white/40 transition-all text-white placeholder:text-purple-200 resize-none"
                    />

                    <button
                      onClick={handleGenerateAIQuestions}
                      disabled={isGenerating || !aiPrompt.trim()}
                      className={`w-full px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 ${
                        isGenerating || !aiPrompt.trim()
                          ? "bg-white/20 cursor-not-allowed"
                          : "bg-white text-purple-700 hover:bg-purple-50 shadow-lg"
                      }`}
                    >
                      {isGenerating ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          <span>Generate Questions</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Loading Animation */}
                  {isGenerating && (
                    <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                        <p className="text-sm text-purple-100">
                          AI is crafting your questions...
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {showModal && (
          <QuestionModal
            onSave={handleSaveQuestion}
            onCancel={() => {
              setShowModal(false);
              setEditingIndex(null);
            }}
            initialData={editingIndex !== null ? questions[editingIndex] : null}
          />
        )}
      </div>
    </div>
  );
}

export default CreateTest;
