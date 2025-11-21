// import React from "react";

// export default function DashboardCard({ title, value, children }) {
//   return (
//     <div
//       style={{
//         background: "white",
//         borderRadius: "12px",
//         padding: "20px",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//         minHeight: "100px",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//       }}
//     >
//       <h4 style={{ margin: 0, color: "#6B7280", fontSize: "14px" }}>{title}</h4>

//       {value && (
//         <div style={{ fontSize: "28px", fontWeight: "bold", marginTop: "10px" }}>
//           {value}
//         </div>
//       )}

//       {children}
//     </div>
//   );
// }


import React from "react";

export default function DashboardCard({ title, value, children, bgColor = "white", borderColor = "#4F46E5" }) {
  return (
    <div
      style={{
        background: bgColor,
        borderTop: `6px solid ${borderColor}`,
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
        minHeight: "110px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <h4 style={{ margin: 0, color: borderColor, fontSize: "15px", fontWeight: 600 }}>
        {title}
      </h4>

      {value && (
        <div style={{ fontSize: "30px", fontWeight: "bold", marginTop: "12px", color: "#1F2937" }}>
          {value}
        </div>
      )}

      {children}
    </div>
  );
}
