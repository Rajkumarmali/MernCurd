const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../Models/user');
const RequireLogin = require('../middleware/RequireLogin');
const router = express.Router();

const secret = "qwertyuiopasdfghjklzxcvbnm"

router.post('/signin', async (req, res) => {
    const userData = req.body;
    const hasPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User({
        name: userData.name,
        email: userData.email,
        password: hasPassword
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
    const isPassword = await bcrypt.compare(userData.password, user.password);
    if (!isPassword) {
        return res.send("invalid passeord");
    }
    const data = {
        userId: user._id,
    }
    const token = await jwt.sign(data, secret)
    res.send({ token: token });
})
router.get('/usrProfile', RequireLogin, async (req, res) => {
    res.send(req.userId);
})

module.exports = router;