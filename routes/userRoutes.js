const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getDonors, getUserProfile } = require('../controller/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/donors', getDonors); // public donor search
router.get('/:userId',getUserProfile); 

module.exports = router;

// hello world
