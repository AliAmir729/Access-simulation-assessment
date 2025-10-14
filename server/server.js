import express from "express";
import cors from "cors";
import { simulateAccess } from "./simulation.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/simulate", (req, res) => {
  try {
    const employees = req.body; 
    const results = simulateAccess(employees);
    res.json(results);
  } catch (err) {
    console.error("Simulation Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(4000, () => console.log(" Server running on http://localhost:4000"));
