const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Controller for user registration
const createRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Validate required fields
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Check if the email is already in use
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email is already in use");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user in the database
  const user = await User.create({ username, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      message: "User created successfully",
      user: { _id: user.id, email: user.email },
    });
  } else {
    res.status(500);
    throw new Error("User creation failed");
  }
});

// Controller for user login
const createLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email address");
  }

  // Verify the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid password");
  }

  // Generate a JWT token
  const token = jwt.sign({ user: { id: user._id, username: user.username, email: user.email } }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Respond with the token
  res.status(200).json({ message: "Login successful", token });
});

// Controller to get the current user (placeholder)
const getCurrentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { createRegister, createLogin, getCurrentUser };
