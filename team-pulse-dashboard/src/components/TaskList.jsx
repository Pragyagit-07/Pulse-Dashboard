import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskProgress } from "../redux/slices/membersSlice";

export default function TaskList() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.role);
  const members = useSelector((state) => state.members.list);

  const user = members.find((m) => m.id === currentUser?.id);

  if (!user) return null;

  const handleProgress = (taskId, type) => {
    const task = user.tasks.find((t) => t.id === taskId);
    if (!task) return;

    let newProgress = task.progress;

    if (type === "inc") newProgress = Math.min(100, newProgress + 10);
    if (type === "dec") newProgress = Math.max(0, newProgress - 10);

    dispatch(
      updateTaskProgress({
        userId: user.id,
        taskId: taskId,
        progress: newProgress
      })
    );
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2 style={{ marginBottom: "16px" }}>Your Tasks</h2>

      {user.tasks.length === 0 && <p>No tasks assigned yet.</p>}

      {user.tasks.map((task) => (
        <div
          key={task.id}
          style={{
            background: "white",
            padding: "16px",
            borderRadius: "10px",
            marginBottom: "16px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ margin: 0, textDecoration: task.completed ? "line-through" : "none" }}>
                {task.title}
              </h3>
              <p style={{ margin: "4px 0", color: "#555" }}>
                Due: {task.dueDate}
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              {task.completed ? (
                <span style={{
                  display: "inline-block",
                  padding: "6px 10px",
                  background: "#10B981",
                  color: "white",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 600
                }}>
                  Completed
                </span>
              ) : (
                <span style={{
                  display: "inline-block",
                  padding: "6px 10px",
                  background: "#f3f4f6",
                  color: "#111827",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 600
                }}>
                  {task.progress}% 
                </span>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: "100%",
              height: "10px",
              background: "#e5e7eb",
              borderRadius: "5px",
              margin: "10px 0",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${task.progress}%`,
                height: "10px",
                background: "#4f46e5",
                transition: "0.3s",
              }}
            />
          </div>

          <p style={{ margin: "4px 0" }}>Progress: {task.progress}%</p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              onClick={() => handleProgress(task.id, "dec")}
              style={{
                padding: "6px 12px",
                background: "#e5e7eb",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
              disabled={task.completed}
            >
              -10%
            </button>
            <button
              onClick={() => handleProgress(task.id, "inc")}
              style={{
                padding: "6px 12px",
                background: "#4f46e5",
                color: "white",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
              disabled={task.completed}
            >
              +10%
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}



