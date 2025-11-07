import API from "../api";
import { useState } from "react";

export default function StudentTable({ students, setStudents }) {


  const toggleStatus = async (id, field) => {
    try {
      const student = students.find((s) => s._id === id);
      const update = { [field]: !student[field] };

      const res = await API.put(`/students/update/${id}`, update);
      const updatedStudent = res.data.student;

      // Update parent-level students array
      setStudents((prev) =>
        prev.map((s) => (s._id === id ? updatedStudent : s))
      );
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };


  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Roll No</th>
          <th>Status</th>
          <th>Authenticated</th>
          <th>Malpractice</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s._id}>
            <td>{s.name}</td>
            <td>{s.rollNo}</td>
            <td>{s.status}</td>
            <td>{s.authenticated ? "Yes" : "No"}</td>
            <td>{s.malpractice ? "Yes" : "No"}</td>
            <td>
              <button onClick={() => toggleStatus(s._id, "authenticated")}>
                Toggle Auth
              </button>
              <button onClick={() => toggleStatus(s._id, "malpractice")}>
                Toggle MP
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
