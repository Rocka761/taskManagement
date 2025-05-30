const jwt = require("jsonwebtoken");
const { failure, success } = require("../utility/response");
const { checkErrorType } = require("../utility/errorType");
const { sha256 } = require("js-sha256");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let data = await req.db.User.findOne({
      where: {
        email: email,
      },
      raw: true,
    });

    if (!data) {
      failure(res, "User Not Registered", 400, null);
      return;
    }

    if (data.password !== sha256(password + process.env.BSALT)) {
      failure(res, "Password is incorrect", 401, null);
      return;
    }

    if (data) {
      let token = jwt.sign(
        {
          userId: data.id,
          role: data.role,
          name: data.name,
          email: data.email,
        },
        process.env.HASH_SECRECT,
        {
          expiresIn: "7d",
        }
      );
      delete data["password"];
      success(res, { ...data, token }, "Successfully Logged In", 200);
    }
  } catch (err) {
    console.log(err);

    let errorType = await checkErrorType(err);
    failure(
      res,
      errorType.displayMsg ? errorType.displayMsg : errorType.msg,
      500
    );
  }
};
