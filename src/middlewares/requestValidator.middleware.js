const { failure } = require("../utility/response");

module.exports = (validator) => {
  return (req, res, next) => {
    const { error } = validator.validate(req.body, { abortEarly: false });

    if (error) {
      return failure(
        res,
        "Validation Failed",
        400,
        error.details.map((err) => err.message)
      );
    }
    next();
  };
};
