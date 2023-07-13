const express =  require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const {User} = require('../models/user.models')
const userRouter = express.Router();

userRouter.get('/',async(req,res)=>{
    res.send("Welcome to user section!")
})

userRouter.post("/signup", async (req, res) => {
    const { email, password, confirmPassword } = req.body;
  
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Password and confirm password do not match' });
    }
  
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }
    
        bcrypt.hash(password, 8, async (err, hashedPassword) => {
            if (err) {
            throw new Error(err.message);
            }
    
            const userData = new User({ email, password: hashedPassword });
            await userData.save();
    
            return res.status(200).json({ ok: true, msg: "User registered successfully!" });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "msg":error.message });
    }
});
  


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ ok: false, msg: "User not found." });
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ ok: false, msg: "Invalid credentials" });
        }
    
        const token = jwt.sign({ userId: user._id }, process.env.userToken, { expiresIn: "2hr" });
        const response = {
            ok: true,
            token,
            msg: "Login successful",
        };
    
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
});

userRouter.post('/logout',async(req,res)=>{
    try {

        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found in database" });
        }

        // Perform any additional logout operations, if needed
        res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        console.error("Error logging out:", err);
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = {userRouter}