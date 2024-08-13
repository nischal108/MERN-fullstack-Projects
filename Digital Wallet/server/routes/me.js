const express = require('express');
const authMiddleware = require('../middleware/authmiddleware');
const User = require('../models/User');

const router = express.Router(); 

router.get('/getcurrentuser', authMiddleware, async (req, res) => { 
    try {
        const userID = req.user;

        const loggedUser = await User.findOne({ _id: userID });

        if (!loggedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.send({
            name: loggedUser.name,
            email: loggedUser.email,
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
