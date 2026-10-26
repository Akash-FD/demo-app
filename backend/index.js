const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World from Express Backend!");
});

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Backend is running smoothly" });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
