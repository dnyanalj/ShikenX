// src/pages/ExaminerDashboard.jsx
import React, { useEffect, useState } from "react";
import { getAllTests } from "../api/examinerApi";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { deleteTest } from "../api/examinerApi";

function ExaminerDashboard() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllTests();
        setTests(res.data.tests || []);
      } catch (err) {
        console.error("Error fetching tests:", err);
      }
    })();
  }, []);

  const handleDelete = async (testId) => {
    const confirmDelete = window.confirm(
      "Are you sure? This will delete the test and all its data."
    );
    if (!confirmDelete) return;
    try {
      await deleteTest(testId);
      setTests((prev) => prev.filter((t) => t.id !== testId));
    } catch (err) {
      alert("Failed to delete test");
    }
  };

  return (
    <DashboardLayout role="examiner" tests={tests} handleDelete={handleDelete} />
  );
}

export default ExaminerDashboard;
