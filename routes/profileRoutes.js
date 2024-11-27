const express = require("express");
const Profile = require("../models/Profile");
const router = express.Router();

// @route GET /profiles
// @desc Get all profiles
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route POST /profiles
// @desc Add a new profile
router.post("/", async (req, res) => {
  const {
    name,
    title,
    location,
    summary,
    experience,
    education,
    skills,
    connections,
  } = req.body;
  try {
    const newProfile = new Profile({
      name,
      title,
      location,
      summary,
      experience,
      education,
      skills,
      connections,
    });
    await newProfile.save();
    res.json(newProfile);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route GET /profiles/:id
// @desc Get a profile by ID
router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route PUT /profiles/:id
// @desc Update a profile
router.put("/:id", async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!profile) return res.status(404).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route DELETE /profiles/:id
// @desc Delete a profile
router.delete("/:id", async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) return res.status(404).json({ msg: "Profile not found" });
    res.json({ msg: "Profile deleted" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
