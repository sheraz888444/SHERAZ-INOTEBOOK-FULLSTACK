const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser=require('../Middleware/Fetchuser')
const JWT_SECRET = "sheraz@ahmed";

// route 1: ✅ Create a user (no login required) /auth/api/createUser
router.post('/createUser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // ❌ You had if (!existingUser) — logic was inverted
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: 'Sorry, a user with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password, salt);

    let newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secpass,
    });

    const data = {
      user: {
        id: newUser.id
      }
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// route 2: ✅ Authenticate a user (login, no auth required)   /api/auth/login 
router.post('/login', [
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // ❌ You had req.body() — that's incorrect
  const { email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: 'Wrong credentials' });
    }

    // ❌ You wrote bcrypt.passwordCompare — wrong method
    const passwordCompare = await bcrypt.compare(password, existingUser.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: 'Wrong credentials' });
    }

    const data = {
      user: {
        id: existingUser.id
      }
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// route 3:fetching details /api/auth/getUser   login-required
router.post('/getUser', fetchuser, async (req, res) => {
  try {
    // ✅ Get user ID from middleware (set in req.user)
    const userId =  req.user.id;

    // ✅ Fetch user from DB excluding the password field
    const user = await User.findById(userId).select("-password");


    // ✅ Send user data
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
