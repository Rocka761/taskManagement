"use strict";

var _require = require("winston"),
  createLogger = _require.createLogger,
  format = _require.format,
  transports = _require.transports;
var DailyRotateFile = require("winston-daily-rotate-file");
var path = require("path");
var combine = format.combine,
  timestamp = format.timestamp,
  printf = format.printf,
  colorize = format.colorize;
var logFormat = printf(function (_ref) {
  var timestamp = _ref.timestamp,
    level = _ref.level,
    message = _ref.message;
  return "[".concat(timestamp, "] ").concat(level.toUpperCase(), ": ").concat(message);
});
var logger = createLogger({
  level: "info",
  format: combine(timestamp(), logFormat),
  transports: [
  // Daily rotating combined logs
  new DailyRotateFile({
    filename: path.join(__dirname, "../../logs/%DATE%-combined.log"),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "10m",
    maxFiles: "14d"
  }),
  // Daily rotating error logs
  new DailyRotateFile({
    filename: path.join(__dirname, "../../logs/%DATE%-error.log"),
    level: "error",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "5m",
    maxFiles: "14d"
  })]
});

// Log to console in development mode
if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console({
    format: combine(colorize(), timestamp(), logFormat)
  }));
}
module.exports = logger;