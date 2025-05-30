const response = require("../utility/response");

const errorHandler = (err, req, res, next) => {
  const timestamp = new Date().toISOString();

  // Log to console manually
  console.error(`\n[${timestamp}] ERROR in ${req.method} ${req.originalUrl}`);
  console.error(`Message: ${err.message}`);
  console.log(err);

  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  // Handle Sequelize or DB errors
  if (err.name && err.name.includes("Sequelize")) {
    return response.failure(res, "Database Error", 500, err.message);
  }

  // General error fallback
  return response.failure(
    res,
    err.message || "Internal Server Error",
    err.statusCode || 500,
    process.env.NODE_ENV === "development" ? err.stack : undefined
  );
};

const catchErrors = (fn) => {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = { errorHandler, catchErrors };
