import React, { useState } from "react"; 
import { useSelector } from "react-redux";
import Header from "../components/Header";
import MemberCard from "../components/MemberCard";
import StatusSelector from "../components/statusSelector";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import StatusPieChart from "../components/StatusPieChart";
import Sidebar from "../components/Sidebar"; 
import DashboardCard from "../components/DashboardCard";


export default function Dashboard() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("Dashboard");
const { currentRole } = useSelector((state) => state.role);
  const members = useSelector((state) => state.members.list);
  const loading = useSelector((state) => state.members.loading);

  const filteredMembers = members.filter((m) =>
    statusFilter === "All" ? true : m.status === statusFilter
  );

  const statusCounts = filteredMembers.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0 ) + 1;
    return acc;
  }, {});

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />

      {/* Right main area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Header />

        {/* Main content */}
        <div style={{ flex: 1, padding: "20px", background: "#F9FAFB", overflowY: "auto" }}>
          {loading && <p>Loading members...</p>}

          {/* Team Lead View */}
          {!loading && currentRole === "lead" && currentSection === "Dashboard" && (
            <>
              {/* Add Task Button */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                <button
                  onClick={() => setIsTaskFormOpen(true)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "1px solid #4F46E5",
                    background: "#4F46E5",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  + Add Task
                </button>
              </div>


              {/* DASHBOARD SUMMARY CARDS */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "25px",
  }}
>
  

  <DashboardCard
  title="Total Employees"
  value={members.length}
  bgColor="#ECFDF5"
  borderColor="#10B981"
/>

<DashboardCard
  title="Currently Working"
  value={statusCounts["Working"] || 0}
  bgColor="#EFF6FF"
  borderColor="#3B82F6"
/>

<DashboardCard
  title="Pending Tasks"
  value={
    members.reduce(
      (total, m) => total + m.tasks.filter(t => t.progress < 100).length,
      0
    )
  }
  bgColor="#FFF7ED"
  borderColor="#F97316"
/>

</div>


              {/* Status Filter Buttons (Below Add Task) */}
              <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
                {[ "Working", "Break", "Meeting", "Offline"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      cursor: "pointer",
                      background: statusFilter === status ? "#4F46E5" : "white",
                      color: statusFilter === status ? "white" : "#333",
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Sorting Dropdown */}
              <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
                <label style={{ marginRight: "10px" }}>Sort by Tasks:</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    background: "white",
                    color: "#111827",
                  }}
                >
                  <option value="none">None</option>
                  <option value="asc">Least Tasks → Most</option>
                  <option value="desc">Most Tasks → Least</option>
                </select>
              </div>

              {/* Status Summary */}
              <div
                style={{
                  display: "flex",
                  gap: "40px",
                  alignItems: "center",
                  marginBottom: "20px",
                  background: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                {/* Status Counts */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontWeight: 500 }}>
                  {["Working", "Break", "Meeting", "Offline"].map((status) => (
                    <div
                      key={status}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        minWidth: "120px",
                        fontSize: "14px",
                      }}
                    >
                      <span>{status}</span>
                      <span>{statusCounts[status] || 0}</span>
                    </div>
                  ))}
                </div>

                {/* Pie Chart */}
                <StatusPieChart statusCounts={statusCounts} />
              </div>

              <h2 style={{ marginBottom: "20px" }}>Team Members</h2>

              {filteredMembers
                .sort((a, b) => {
                  const aTasks = a.tasks.filter((t) => t.progress < 100).length;
                  const bTasks = b.tasks.filter((t) => t.progress < 100).length;

                  if (sortOrder === "asc") return aTasks - bTasks;
                  if (sortOrder === "desc") return bTasks - aTasks;
                  return 0;
                })
                .map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}

              {isTaskFormOpen && (
                <>
                  <div
                    onClick={() => setIsTaskFormOpen(false)}
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      zIndex: 10,
                    }}
                  />

                  <div
                    style={{
                      position: "fixed",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      background: "white",
                      padding: "20px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      zIndex: 20,
                      minWidth: "300px",
                      maxWidth: "600px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                      <h3>Add Task</h3>
                      <button
                        onClick={() => setIsTaskFormOpen(false)}
                        style={{
                          border: "none",
                          background: "transparent",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                      >
                        &times;
                      </button>
                    </div>
                    <TaskForm onClose={() => setIsTaskFormOpen(false)} />
                  </div>
                </>
              )}
            </>
          )}

          {/* Team Member View */}
          {/* <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
                <label style={{ marginRight: "10px" }}>Sort by Tasks:</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    background: "white",
                    color: "#111827",
                  }}
                >
                  <option value="none">None</option>
                  <option value="asc">Least Tasks → Most</option>
                  <option value="desc">Most Tasks → Least</option>
                </select>
              </div> */}
          {!loading && currentRole === "member" && currentSection === "Dashboard" && (
            <>
              <StatusSelector />
              <TaskList />
            </>
          )}
        </div>
      </div>
    </div>
  );
}


    