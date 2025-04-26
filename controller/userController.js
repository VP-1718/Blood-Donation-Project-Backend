const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const { json } = require('express');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { name, email, password, role, bloodType, location, phone, isDonor, organDonor, organs, lastDonation } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role,
    bloodType,
    location,
    phone,
    isDonor,
    organDonor,
    organs,
    lastDonation
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

const updateUserProfile = async (req, res) => {
  const { userId } = req.params
  const updatedData = req.body

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "user not found" })
    }

    Object.keys(updatedData).forEach((key) => {
      user[key] = updatedData[key]
    });

    // Object.assign(user,updatedData);
    const updatedUser = await user.save();

    res.json({
      message: "profile updated successfully",
      user: updatedUser
    })
  } catch (error) {
    console.error("error updating user profile:", error);
    res.status(500).json({ message: "internal server error" })
  }
}

const getUserProfile = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ messgae: "user not found" })
    }
    res.json(user)
  } catch (error) {
    console.log("error fetching user", error)
    res.status(500).json({ message: "internal server error" })
  }
}

const getDonors = async (req, res) => {
  const { bloodType, location } = req.query;
  const donors = await User.find({
    role: 'donor',
    isAvailable: true,
    ...(bloodType && { bloodType }),
    ...(location && { location })
  });
  // console.log(bloodType,location)
  res.json(donors);
};

module.exports = { registerUser, loginUser, getDonors, getUserProfile, updateUserProfile};
