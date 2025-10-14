import React, { useState } from "react";

function App() {
  const [logs, setLogs] = useState([]);

  const handleSimulate = async () => {
    try {
      const response = await fetch("http://localhost:4000/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([
          { id: "EMP001", access_level: 2, request_time: "09:15", room: "ServerRoom" },
          { id: "EMP002", access_level: 1, request_time: "09:30", room: "Vault" },
          { id: "EMP003", access_level: 3, request_time: "10:05", room: "ServerRoom" },
          { id: "EMP004", access_level: 3, request_time: "09:45", room: "Vault" },
          { id: "EMP005", access_level: 2, request_time: "08:50", room: "R&D Lab" },
          { id: "EMP006", access_level: 1, request_time: "10:10", room: "R&D Lab" },
          { id: "EMP007", access_level: 2, request_time: "10:18", room: "ServerRoom" },
          { id: "EMP008", access_level: 3, request_time: "09:55", room: "Vault" },
          { id: "EMP001", access_level: 2, request_time: "09:28", room: "ServerRoom" },
          { id: "EMP006", access_level: 1, request_time: "10:15", room: "R&D Lab" },
        ]),
      });

      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error("Error during simulation:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Access Simulator</h1>
      <button
        onClick={handleSimulate}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Simulate Access
      </button>

      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Room</th>
            <th>Request Time</th>
            <th>Status</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <tr key={index}>
                <td>{log.id}</td>
                <td>{log.room}</td>
                <td>{log.request_time}</td>
                <td>{log.status}</td>
                <td>{log.reason}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No simulation data yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
