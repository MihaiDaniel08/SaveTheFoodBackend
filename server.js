const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const sequelize = require("./config/db"); // Import the sequelize instance
const router = require("./routes");
const db = require("sequelize");

const app = express();
const port = 5179;

// Add CORS middleware
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Parse JSON bodies
app.use(express.json());

// Test the database connection
sequelize.authenticate()
    .then(() => console.log("Database connected..."))
    .catch(err => console.log("Error: " + err));

// Sync models with the database
sequelize.sync()
    .then(() => console.log("Database synced..."))
    .catch(err => console.log("Error: " + err));

// Use the router for API routes
app.use("", router);

app.get("/reset", async (req, res) => {
    try {
        await db.query("SET FOREIGN_KEY_CHECKS = 0");
        await db.sync({ force: true });
        await db.query("SET FOREIGN_KEY_CHECKS = 1");
        res.status(200).send("Db reset complete!");
    } catch (err) {
        res.status(500).send({ message: "Db reset error", err: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});