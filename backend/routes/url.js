import express from "express";
import { nanoid } from "nanoid";
import Url from "../models/Url.js";

const router = express.Router();

// POST /api/shorten - Create short URL
router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    // Validate URL format
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlRegex.test(originalUrl)) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    // Check if URL already exists
    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.json({
        originalUrl: url.originalUrl,
        shortUrl: `http://localhost:5000/${url.shortCode}`,
        shortCode: url.shortCode
      });
    }

    // Generate short code
    const shortCode = nanoid(6);
    
    // Create new URL
    url = new Url({
      originalUrl,
      shortCode
    });

    await url.save();

    res.json({
      originalUrl: url.originalUrl,
      shortUrl: `http://localhost:5000/${url.shortCode}`,
      shortCode: url.shortCode
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});



// GET /urls - Get all URLs (for admin)
router.get("/urls", async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
