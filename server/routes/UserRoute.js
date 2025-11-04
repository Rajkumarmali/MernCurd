const express = require('express');
const User = require('../Models/user');
const router = express.Router();

router.post('/signin', async (req, res) => {
    const userData = req.body;
    const newUser = new User({
        name: userData.name,
        email: userData.email,
        password: userData.password
    });
    await newUser.save();
    res.send("user register successfully");
})

router.post('/login', async (req, res) => {
    const userData = req.body;
    const user = await User.findOne({ email: userData.email });
    if (!user) {
        return res.send("user not found")
    }
    if (userData.password !== user.password) {
        return res.send("username or password are wrong");
    }
    res.send(user);
})

module.exports = router;