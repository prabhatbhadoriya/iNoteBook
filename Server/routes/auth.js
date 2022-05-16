const express = require('express');
const User = require('../models/User');

const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "helloPrabhat!"

// Route 1 to register a new user
let success = false;
router.post('/createuser', [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
], async (req, res) => {

    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ success, errors: errors.array() });
    }
    // Check if user already exists
    let user = await User.findOne({ email: req.body.email });

    // Create a new user if one doesn't exist

    try {
        if (user) {
            return res.status(400).json({success, msg: 'User already exists' });
        }

        // Hash password

        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword

        });


        // Create and assign a token
        const data = {
            user: {
                _id: user._id,
            }

        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken);
        success = true;
        res.json({ success,authtoken });

        res.json("User Succesfully Created!");
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }





});

// Route 2 to login a user

// Authenticate user using POST method and JWT
router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').exists().withMessage('Password is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        let success = false;

        // Check if user exists
        if (!user) {
            return res.status(400).json({success, msg: 'Invalid Credentials' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success,msg: 'Invalid Credentials' });
        }

        // Create and assign a token
        const data = {
            user: {
                _id: user._id,
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success,authtoken });
        // res.json("User Succesfully Logged In!");

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }


}
);

// Route 3 to get user details

    router.post('/getuser', fetchuser, async (req, res) => {
        try {
            const userId = req.user._id;
            const user = await User.findById(userId).select('-password');
            res.json(user);
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
    

    




module.exports = router