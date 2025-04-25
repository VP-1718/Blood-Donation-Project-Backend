const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getDonors, getUserProfile, updateUserProfile, getOrganDonors } = require('../controller/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/donors', getDonors); // public donor search
router.get('/organDonors', getOrganDonors);
router.get('/:userId',getUserProfile);
router.put('/:userId',updateUserProfile);

module.exports = router;

// hello world
