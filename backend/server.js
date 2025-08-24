import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database.js";
import urlRoutes from "./routes/url.js";
import Url from "./models/Url.js";

// Load environment variables
dotenv.config({ path: "./config.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", urlRoutes);

// Redirect route - must be after API routes
app.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    
    // Skip if it's an API route
    if (shortCode === 'api' || shortCode === 'health') {
      return res.status(404).json({ error: "URL not found" });
    }
    
    const url = await Url.findOne({ shortCode });
    
    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    // Increment click count
    url.clicks += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "URL Shortener API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
