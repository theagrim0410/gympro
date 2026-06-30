const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const User = require("./models/User");
const Nutrition = require("./models/Nutrition");
const Complaint = require("./models/Complaint");
const Workout = require("./models/Workout");
const UserDetails = require("./models/UserDetails");
const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// Home Route
// =========================
app.get("/", (req, res) => {
  res.send("Backend is Running 🚀");
});

// =========================
// Test Route
// =========================
app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Server is working",
  });
});

// =========================
// Register Route
// =========================
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check required fields
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Check if user already exists
    const exists = await User.findOne({ username });
    const existsDetails = await UserDetails.findOne({ username });
    if (exists || existsDetails) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create new user
    const user = new User({
      username,
      password,
      role: "user",
    });

    const userDetails = new UserDetails({
      userId: user._id,
      username,
      role: "user",
      isAdmin: false,
      totalWorkouts: 0,
      workoutStreak: 0,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
      workouts: 0
    });

    await user.save();
    await userDetails.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// =========================
// Get All Users from login Route
// =========================
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// =========================
// Login Route
// =========================
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check required fields
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Find user
    const user = await User.findOne({
      username,
      password,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// =========================
// Nutrition Route
// =========================

app.get("/nutrition", async (req, res) => {
  try {
    const nutrition = await Nutrition.find();

    res.status(200).json({
      success: true,
      data: nutrition,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// =========================
// Complaints Route
// =========================
app.get("/complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: complaints,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// =========================
// Create Complaint Route
// =========================
app.post("/complaints", async (req, res) => {
  try {
    const { userId, username, category, subject, description } = req.body;

    if (!userId || !username || !category || !subject || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const complaint = await Complaint.create({
      userId,
      username,
      category,
      subject,
      description,
    });

    res.status(201).json({
      success: true,
      data: complaint,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// =========================
// Update Complaint Status Route
// =========================
app.put("/complaints/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// =========================
// Delete Complaint Route
// =========================
app.delete("/complaints/:id", async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Complaint deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// =========================
// Get Workout By ID
// =========================
app.get("/workouts/:id", async (req, res) => {
  try {
    const workout = await Workout.findOne({
      id: Number(req.params.id),
    });

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: "Workout not found",
      });
    }

    res.status(200).json({
      success: true,
      data: workout,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// =========================
//userdetailsfetch
// =========================
app.get("/userdetails", async (req, res) => {
  try {
    const details = await UserDetails.find();

    res.status(200).json({
      success: true,
      count: details.length,
      data: details,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// =========================
// Get UserDetails by ID Route
// =========================
app.get("/userdetails2/:id", async (req, res) => {
  try {
    const data = await UserDetails.findById(req.params.id);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// =========================
// Update UserDetails Route
// =========================

app.put("/usersupdate/:id", async (req, res) => {
  try {
    const userDetails = await UserDetails.findById(req.params.id);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "UserDetails not found",
      });
    }

    const oldUsername = userDetails.username;

    const updated = await UserDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      }
    );
    await User.findOneAndUpdate(
      { username: oldUsername },
      { username: req.body.username ,
        role: req.body.role,
      },
      {
        returnDocument: "after",
      }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// =========================
// Delete UserDetails Route
// =========================
app.delete("/usersdelete/:id", async (req, res) => {
  try {
    const userDetails = await UserDetails.findById(req.params.id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "UserDetails not found",
      });
    }
    const user = await userDetails.username;
    await UserDetails.findByIdAndDelete(req.params.id);
    await User.findOneAndDelete({ username: user });
    res.json({
      success: true,
      message: "User details deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// =========================
// 404 Route
// =========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =========================
// Start Server
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("==================================");
  console.log(`Server running on port ${PORT}`);
  console.log(` http://localhost:${PORT}`);
  console.log("==================================");
});
