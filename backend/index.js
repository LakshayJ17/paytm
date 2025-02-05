const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());


// Any request to /api/v1 path is forwarded to the mainRouter
// This creates a base URL structure for your API (e.g., http://yourserver.com/api/v1/...)
app.use("/api/v1", rootRouter);

app.listen(3000);