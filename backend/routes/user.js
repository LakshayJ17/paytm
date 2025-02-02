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

// SIGNIN SCHEMA & LOGIC
// -----------------------------------------------
// Check if the given inputs satisfy the schema
// if not, return an error message
// If yes, check whether user exists in db
// If yes, return a token using jwt.sign
// If no, return an error message

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json(({ message: "Email already taken / Incorrect inputs" }))
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if (user) {
        // Generate a JWT with the user's ID as the payload
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
        
        // Send the token back to the client in the response
        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

module.exports = router