// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const TempUser = require('../models/TempUser');



// Gmail SMTP config
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});


// Signup with OTP
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ msg: "Email already registered" });

        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save to temp collection
        await TempUser.findOneAndUpdate(
            { email },
            { name, email, password: hashedPassword, otp },
            { upsert: true, new: true }
        );

        // Send OTP to email
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Verify Your Email",
            text: `Your OTP is: ${otp}`
        });

        res.status(200).json({ msg: "OTP sent to your email. Please verify.", success : true });
    } catch (err) {
        res.status(500).json({ msg: "Signup failed", error: err.message,  success : false });
    }
});

router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        const tempUser = await TempUser.findOne({ email });
        if (!tempUser) return res.status(400).json({ msg: "User not found or OTP expired" });

        if (tempUser.otp !== otp) {
            return res.status(400).json({ msg: "Invalid OTP" });
        }

        const newUser = new User({
            name: tempUser.name,
            email: tempUser.email,
            password: tempUser.password
        });

        await newUser.save();
        await TempUser.deleteOne({ email });

        // Generate JWT Token
        const token = jwt.sign({ id: newUser._id, 
            name: newUser.name, 
            email: newUser.email 
         }, process.env.JWT_SECRET, { expiresIn: '1h' });

        

        res.status(201).json({ msg: "Email verified and user registered!", token, user: newUser, success:true });

    } catch (err) {
        res.status(500).json({ msg: "OTP verification failed", error: err.message ,  success:false });
    }
});


// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid username", success: false });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid password", success: false });

        const success = true;

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, 
            name: user.name, 
            email: user.email 
         }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ msg: "Login successfully", token, user, success });
    } catch (err) {
        res.status(500).json({ msg: "Login failed", error: err.message });
    }
});



// GET all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Get all users
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching users", error: err.message });
    }
});

const SECRET_KEY =  process.env.JWT_SECRET;

// Middleware to verify token
function authenticateToken(req, res, next) {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) return res.status(401).json({ message: 'Token missing' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token invalid' });
        req.user = user; // decoded payload
        next();
    });
}

// Profile endpoint
router.get('/profile', authenticateToken, (req, res) => {
    // You can fetch user details from DB using req.user.id if needed
    res.json({
        name: req.user.name,
        email: req.user.email,
        id: req.user.id
    });
});


module.exports = router;
