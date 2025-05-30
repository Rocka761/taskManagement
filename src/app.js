require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const db = require("./configs/db");
const { errorHandler } = require("./middlewares/errorHandler.middleware");
const notFoundMiddleware = require("./middlewares/notFound.middleware");
const logger = require("./utility/logger");
const { sha256 } = require("js-sha256");
const { default: rateLimit } = require("express-rate-limit");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet()); // security headers
app.use(morgan("combined")); // logging
app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 100 })); // 100 req/min/IP

app.use("/health", async (req, res) => {
  res.send("OK");
});

app.use(async (req, res, next) => {
  req["db"] = db;
  next();
});

app.use("/auth", require("./routers/auth.router"));
app.use("/user", require("./routers/user.router"));
app.use("/task", require("./routers/task.router"));

app.use(notFoundMiddleware);

app.use(errorHandler);

console.log(sha256("Test@1234" + process.env.FSALT));

module.exports = app;
