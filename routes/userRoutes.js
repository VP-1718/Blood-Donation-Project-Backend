const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getDonors, getUserProfile, updateUserProfile } = require('../controller/userController');
const { registerOrganDonor, getOrganDonors } = require("../controller/organDonorController");

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/donors', getDonors); // public donor search
router.get('/organDonors', getOrganDonors);
router.post('/registerOrganDonor', registerOrganDonor);
router.get('/:userId',getUserProfile);
router.put('/:userId',updateUserProfile);

module.exports = router;

// hello world
