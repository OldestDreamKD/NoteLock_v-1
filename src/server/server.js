const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors"); // If your frontend and backend are on different origins
const bodyparser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS if needed
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/NoteLockDB");
    console.log("Successfully connected to the database.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

connectToDatabase();

// Define Mongoose schema and model

const noteLockUserSchema = new mongoose.Schema({
  user: [
    {
      _id: { type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId },
      email: { type: String, require: true },
      password: { type: String, required: true },
    },
  ],
  note: [
    {
      _id: { type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId },
      title: { type: String, required: true },
      content: { type: String, required: true },
    },
  ],
  password: [
    {
      _id: { type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId },
      accountName: { type: String, required: true },
      username: { type: String, required: true },
      password: { type: String, required: true },
    },
  ],
});

const Note = mongoose.model("Note", noteLockUserSchema);

// API route to retrieve all notes
// ...

// API route to retrieve all notes
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find(); // Fetch data from MongoDB
    res.json(notes); // Send data to the client as JSON
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve notes." });
  }
});
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    const user = await Note.findOne({
      "user.email": email,
      "user.password": password,
    });
    if (user) {
      console.log(user);
      res.json(true);
    } else {
      res.json(true);
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Serve static files from the public folder

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
