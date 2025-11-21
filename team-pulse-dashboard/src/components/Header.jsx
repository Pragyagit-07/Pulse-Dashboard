// import React, { useState } from "react"; 
// import { useDispatch, useSelector } from "react-redux";
// import { switchRole, setCurrentUser } from "../redux/slices/roleSlice";



// export default function Header({ onSearch }) {
//   const dispatch = useDispatch();
//   const { currentRole, currentUser } = useSelector((state) => state.role);
//   const members = useSelector((state) => state.members.list);

//   const [searchTerm, setSearchTerm] = useState("");
  


//   const handleRoleSwitch = () => {
//     const newRole = currentRole === "lead" ? "member" : "lead";
//     dispatch(switchRole(newRole));
//   };

//   const handleMemberSelect = (e) => {
//     const selectedId = e.target.value;
//     const member = members.find((m) => m.id === selectedId) || null;
//     dispatch(setCurrentUser(member));
//   };

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     if (onSearch) onSearch(value); // pass value to parent for filtering tasks
//   };

//   return (
//     <header
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "12px 20px",
//         background: "#f8f9fa", 
//         borderBottom: "1px solid #ddd",
//       }}
//     >
//       {/* Left: Search Panel */}
//       <div>
//         <input
//           type="text"
//           placeholder="Search tasks..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           style={{
//             padding: "6px 12px",
//             borderRadius: "6px",
//             border: "1px solid #ddd",
//             width: "220px",
//           }}
//         />
//       </div>

//       {/* Right: Member & Role */}
//       <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//         {/* Member selector */}
//         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//           <label htmlFor="memberSelect" style={{ fontSize: "14px" }}>
//             Current User:
//           </label>
//           <select
//             id="memberSelect"
//             value={currentUser?.id || ""}
//             onChange={handleMemberSelect}
//             style={{
//               padding: "6px 10px",
//               borderRadius: "6px",
//               border: "1px solid #ddd",
//               background: "white",
//             }}
//           >
//             <option value="">— Select member —</option>
//             {members.map((m) => (
//               <option key={m.id} value={m.id}>
//                 {m.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <span
//           style={{
//             padding: "4px 10px",
//             background: "#e3e3e3",
//             borderRadius: "6px",
//             fontSize: "14px",
//           }}
//         >
//           Role: <strong>{currentRole === "lead" ? "Team Lead" : "Team Member"}</strong>
//         </span>

//         <button
//           onClick={handleRoleSwitch}
//           style={{
//             padding: "6px 12px",
//             border: "none",
//             background: "#4F46E5",
//             color: "white",
//             borderRadius: "6px",
//             cursor: "pointer",
//           }}
//         >
//           Switch to {currentRole === "lead" ? "Member" : "Lead"}
//         </button>
      
//       </div>
//     </header>
//   );
// }



     


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchRole, setCurrentUser } from "../redux/slices/roleSlice";


export default function Header({ onSearch }) {
const dispatch = useDispatch();
const { currentRole, currentUser } = useSelector((state) => state.role);
const members = useSelector((state) => state.members.list);


const [searchTerm, setSearchTerm] = useState("");


const handleRoleSwitch = () => {
const newRole = currentRole === "lead" ? "member" : "lead";
dispatch(switchRole(newRole));
};


const handleMemberSelect = (e) => {
const selectedId = e.target.value;
const member = members.find((m) => m.id === selectedId) || null;
dispatch(setCurrentUser(member));
};


const handleSearchChange = (e) => {
const value = e.target.value;
setSearchTerm(value);
if (onSearch) onSearch(value);
};


return (
<header style={{
display: "flex",
flexWrap: "wrap",
justifyContent: "space-between",
alignItems: "center",
gap: "10px",
padding: "12px 20px",
background: "#ffffff",
borderBottom: "1px solid #e5e7eb"
}}>


<input
type="text"
placeholder="Search tasks..."
value={searchTerm}
onChange={handleSearchChange}
style={{
padding: "8px 12px",
borderRadius: "8px",
border: "1px solid #ddd",
width: "220px",
maxWidth: "100%"
}}
/>


<div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>


<div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
<label style={{ fontSize: "14px" }}>User:</label>
  
<select
  value={currentUser?.id || ""}
onChange={handleMemberSelect}
style={{
padding: "6px 10px",
borderRadius: "8px",
border: "1px solid #ddd"
}}
>
<option value="">Select</option>
{members.map((m) => (
<option key={m.id} value={m.id}>{m.name}</option>
))}
</select>
</div>


<span style={{
background: "#f3f4f6",
padding: "6px 10px",
borderRadius: "8px",
fontSize: "14px"
}}>
{currentRole === "lead" ? "Team Lead" : "Team Member"}
</span>


<button
onClick={handleRoleSwitch}
style={{
padding: "8px 14px",
background: "#4F46E5",
color: "white",
border: "none",
borderRadius: "8px",
cursor: "pointer"
}}
>
Switch Role
</button>
</div>
</header>
);
}