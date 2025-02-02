const express = require("express");
const mainRouter = require("./routes/index")

const app = express();

// When a request comes from /api/v1, it will be redirected to mainRouter
app.use("/api/v1", mainRouter)
