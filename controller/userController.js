const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { name, email, password, role, bloodType, location, phone } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role,
    bloodType,
    location,
    phone
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
  const { bloodType, location } = req.query;
  const donors = await User.find({
    role: 'donor',
    isAvailable: true,
    ...(bloodType && { bloodType }),
    ...(location && { location })
  });

  res.json(donors);
};

module.exports = { registerUser, loginUser, getDonors };
