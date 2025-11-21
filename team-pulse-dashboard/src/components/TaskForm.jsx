import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignTask } from "../redux/slices/membersSlice";

export default function TaskForm({ onClose }) {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.list);

  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedMember, setSelectedMember] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskTitle || !dueDate || !selectedMember) {
      alert("Please fill all fields");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      dueDate,
      progress: 0,
      completed: false
    };

    dispatch(
      assignTask({
        userId: selectedMember,
        task: newTask
      })
    );

    setTaskTitle("");
    setDueDate("");
    setSelectedMember("");

    if (onClose) onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        marginBottom: "30px"
      }}
    >
      <div style={{ marginBottom: "12px" }}>
        <label>Assign to:</label>
        <select
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            marginTop: "4px"
          }}
        >
          <option value="">Choose Member</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Task Title:</label>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter task"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            marginTop: "4px"
          }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            marginTop: "4px"
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          padding: "10px 16px",
          background: "#4F46E5",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          width: "100%",
          fontWeight: 600
        }}
      >
        Assign Task
      </button>
    </form>
  );
}





