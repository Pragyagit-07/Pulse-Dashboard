import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../redux/slices/membersSlice";

export default function statusSelector() {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.role);
  const members = useSelector((state) => state.members.list);

  const loggedInUser = members.find((m) => m.id === currentUser?.id);

  const statuses = ["Working", "Break", "Meeting", "Offline"];

  const handleStatusChange = (status) => {
    dispatch(updateStatus({ userId: loggedInUser.id, status }));
  };

  if (!loggedInUser) return null;

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2 style={{ margin: "20px 0" }}>Update Your Status</h2>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              cursor: "pointer",
              background:
                loggedInUser.status === status ? "#4F46E5" : "white",
              color: loggedInUser.status === status ? "white" : "#333",
              fontWeight: 500,
            }}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}




