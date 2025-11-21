import React from "react";

export default function MemberCard({ member }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Working":
        return "#16a34a";
      case "Break":
        return "#ca8a04";
      case "Meeting":
        return "#2563eb";
      case "Offline":
        return "#9ca3af";
      default:
        return "#6b7280";
    }
  };

  const activeTasks = member.tasks.filter((t) => t.progress < 100).length;

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        padding: "16px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        marginBottom: "16px",
        alignItems: "center",
      }}
    >
      <img
        src={member.avatar}
        alt={member.name}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />

      <div style={{ flexGrow: 1 }}>
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
          {member.name}
        </h3>
         <p className="text-sm text-gray-500 mt-1">
              {member.email}
           </p>


        <span
          style={{
            marginTop: "6px",
            display: "inline-block",
            padding: "4px 10px",
            background: getStatusColor(member.status),
            color: "white",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          {member.status}
        </span>
      </div>

      <div
        style={{
          fontSize: "14px",
          background: "#f3f4f6",
          padding: "6px 12px",
          borderRadius: "8px",
        }}
      >
        Active Tasks:{" "}
        <strong style={{ color: "#4f46e5" }}>{activeTasks}</strong>
      </div>
    </div>
  );
}



