import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Important for handling JSON data
app.use(express.static(path.join(__dirname, "SIGN-UP")));

// Create MySQL connection
const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Sai@9391",
      database: "vyuhas"
    });

    console.log("Connected to the database.");
    return connection;
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
};

const connection = await connectDB();

// Route to serve the login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "SIGN-UP", "index.html"));
});


app.post("/SIGN-UP", async (req, res) => {
  console.log(req.body); // Log the form data
  const { full_name, email, password } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).send("full_name, email, and password are required!");
  }

  try {
    const [result] = await connection.execute(
      "INSERT INTO sign_up1 (full_name, email, password) VALUES (?, ?, ?)",
      [full_name, email, password]
    );

    console.log("User registered:", result);
    res.send("User registered successfully!");
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).send("Database error: " + err.message);
  }
});

