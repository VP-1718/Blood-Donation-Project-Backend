const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { name, email, password, role, bloodGroup, location, contact } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role,
    bloodGroup,
    location,
    contact
  });

  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.json({ token, user });
};

const getDonors = async (req, res) => {
  const { bloodGroup, location } = req.body;
  const donors = await User.find({
    role: 'donor',
    isAvailable: true,
    bloodGroup,
    location
  });

  res.json(donors);
};

module.exports = { registerUser, loginUser, getDonors };
