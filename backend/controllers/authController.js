// backend/controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * 🔹 User Signup
 */
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      message: 'Signup successful',
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * 🔹 User Login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ error: 'Invalid credentials' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        contact: user.contact,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * 🔹 Google Login
 */
exports.googleLogin = async (req, res) => {
  try {
    const { email, googleId, name } = req.body;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        email,
        googleId,
        firstname: name || '',
      });
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      message: 'Google login successful',
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        contact: user.contact,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * 🔹 Get User Profile
 */
exports.getProfile = async (req, res) => {
  try {
    const userId = req.query.id;

    const user = await User.findByPk(userId, {
      attributes: [
        'id',
        'email',
        'firstname',
        'lastname',
        'username',
        'contact',
      ],
    });

    if (!user)
      return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * 🔹 Update User Profile
 */
exports.updateProfile = async (req, res) => {
  try {
    const { id, firstname, lastname, username, contact, password } = req.body;

    const user = await User.findByPk(id);
    if (!user)
      return res.status(404).json({ error: 'User not found' });

    // Update fields if provided
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.username = username || user.username;
    user.contact = contact || user.contact;

    // Update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        contact: user.contact,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
