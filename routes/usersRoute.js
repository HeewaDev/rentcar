const express = require('express');
const router = express.Router();
const UserModel = require('../databases/usermodel');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username, password });
    if (user) {
      res.send(user);
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new UserModel({ username, password }); // Create a new user instance
    await newUser.save();
    res.status(201).json({ message: 'User registration successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
