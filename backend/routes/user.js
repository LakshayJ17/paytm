// Sets up specific routes for user-related operations
// eg - /api/v1/user/signup

const express = require('express');

const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");


// SIGNUP SCHEMA & LOGIC
// ----------------------------------------------
// Check if the given inputs satisfy the schema
// If not, return an error message
// If yes, check whether user already exits in db
// If yes, return an error message (bcz its a signup request) -> meaning new user create 
// If no, create a new user in db

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({ message: "Email already taken / Incorrect inputs" })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    });

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })
    const userId = user._id
})

module.exports = router