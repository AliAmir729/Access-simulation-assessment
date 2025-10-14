// simulation.js

// ✅ Room Rules
const roomRules = {
  ServerRoom: { minAccess: 2, open: "09:00", close: "11:00", cooldown: 15 },
  Vault: { minAccess: 3, open: "09:00", close: "10:00", cooldown: 30 },
  "R&D Lab": { minAccess: 1, open: "08:00", close: "12:00", cooldown: 10 },
};

// ✅ Helper function: convert "HH:MM" → total minutes
function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

// ✅ Generate random requests (for testing)
function generateRandomRequests(employees) {
  const rooms = Object.keys(roomRules);
  return employees.map((emp) => ({
    id: emp.name, // using name as unique ID
    access_level:
      emp.role === "Manager" ? 3 : emp.role === "Staff" ? 2 : 1,
    room: rooms[Math.floor(Math.random() * rooms.length)],
    request_time: `${8 + Math.floor(Math.random() * 5)}:${String(
      Math.floor(Math.random() * 60)
    ).padStart(2, "0")}`,
  }));
}

// ✅ Main logic function
export function simulateAccess(employees) {
  const results = [];
  const lastAccess = {}; // Store last access times per employee per room

  // 🔹 If frontend sends only names/roles, generate random room requests
  const employeeRequests = employees[0]?.room
    ? employees
    : generateRandomRequests(employees);

  for (const emp of employeeRequests) {
    const { id, access_level, request_time, room } = emp;
    const rule = roomRules[room];
    const time = timeToMinutes(request_time);
    const open = timeToMinutes(rule.open);
    const close = timeToMinutes(rule.close);

    // 1️⃣ Check Access Level
    if (access_level < rule.minAccess) {
      results.push({
        ...emp,
        status: "Denied",
        reason: "Below required access level",
      });
      continue;
    }

    // 2️⃣ Check Room Time
    if (time < open || time > close) {
      results.push({
        ...emp,
        status: "Denied",
        reason: "Room closed at this time",
      });
      continue;
    }

    // 3️⃣ Check Cooldown
    const lastTime = lastAccess[id]?.[room];
    if (lastTime && time - lastTime < rule.cooldown) {
      results.push({
        ...emp,
        status: "Denied",
        reason: `Cooldown active (${rule.cooldown} min)`,
      });
      continue;
    }

    // ✅ Access Granted
    results.push({
      ...emp,
      status: "Granted",
      reason: `Access granted to ${room}`,
    });

    // Update last access time
    if (!lastAccess[id]) lastAccess[id] = {};
    lastAccess[id][room] = time;
  }

  return results;
}
