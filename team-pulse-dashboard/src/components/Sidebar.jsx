import React from "react";
import { CalendarHeart,Home, Folder, Users, AccessibilityIcon, CheckSquare, Ticket, } from "lucide-react"; 

export default function Sidebar({ currentSection, setCurrentSection }) {
  const sections = [
    { name: "Dashboard", icon: <Home size={20} /> },
    { name: "Projects", icon: <Folder size={20} /> },
    { name: "Members", icon: <Users size={20} /> },
    { name: "Tasks", icon: <CheckSquare size={20} /> },
    { name: "Tickets", icon: <Ticket size={20} /> },
    {name: "Accounts", icon: <AccessibilityIcon size={20} />},
    
  ];

  return (
    <div
      style={{
        width: "200px",
        background: "#372df7ff",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "30px" }}>
        
        <CalendarHeart size={30} />  My Tasks
      </h2>

      {sections.map((section) => (
        <button
          key={section.name}
          onClick={() => setCurrentSection(section.name)}
          style={{
            background: currentSection === section.name ? "#6760ebff" : "transparent",
            border: "none",
            color: "white",
            padding: "10px 12px",
            borderRadius: "6px",
            cursor: "pointer",
            textAlign: "left",
            fontWeight: currentSection === section.name ? "600" : "500",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            transition: "background 0.2s",
          }}
        >
          {section.icon}
          {section.name}
        </button>
      ))}
    </div>
  );
}





