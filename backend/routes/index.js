// Creates a main router that handles all routes under /api/v1
// Routes all requests with /user to the userRouter
// For example, /api/v1/user/... will be handled by the userRouter

const express = require('express');
const userRouter = require("./user");
const accountRouter = require("./account");

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;