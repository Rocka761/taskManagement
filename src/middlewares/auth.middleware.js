const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw "Unauthorized!!";
    const payload = jwt.verify(
      req.headers.authorization,
      process.env.HASH_SECRECT
    );
    req.payload = payload;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({
      code: 401,
      message: "Unauthorized",
      displayMsg:
        e?.message === "jwt expired"
          ? "Session expired. Please log in again."
          : "Unauthorized token. Please log in again.",
    });
  }
};
