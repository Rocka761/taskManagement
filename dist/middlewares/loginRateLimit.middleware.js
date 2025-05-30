"use strict";

var rateLimit = require("express-rate-limit");
var loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  // 15 minutes
  max: 5,
  // Limit each IP to 5 login requests per windowMs
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
    error: null
  },
  standardHeaders: true,
  legacyHeaders: false
});
module.exports = loginLimiter;