const { sha256 } = require("js-sha256");
const { checkErrorType } = require("../utility/errorType");
const { failure, success } = require("../utility/response");
const { Op } = require("sequelize");

exports.create = async (req, res) => {
  const { name, email, password, role } = req.body;
  const { userId } = req.payload;

  const t = await req.db.seq.transaction();

  try {
    let data = await req.db.User.create(
      {
        name,
        email,
        password: sha256(password + process.env.BSALT),
        role,
        createdBy: userId,
      },
      {
        transaction: t,
      }
    );

    data = data.get({ plain: true });
    delete data.password;
    t.commit();
    success(res, data, "Successfully Created", 200);
  } catch (err) {
    console.log(err);
    let errorType = await checkErrorType(err);
    t.rollback();
    failure(
      res,
      errorType.displayMsg ? errorType.displayMsg : errorType.msg,
      500
    );
  }
};

exports.getAllUsers = async (req, res) => {
  const { searchOptions, limit, page, sortBy, sortDirection } = req.body;
  const { userId } = req.payload;

  // Base query
  let query = {
    attributes: ["id", "name", "email", "role", "createdBy", "updatedBy"],
    include: [
      {
        model: req.db.User,
        as: "createdByUser",
        attributes: ["id", "name", "email"],
        raw: true,
      },
      {
        model: req.db.User,
        as: "updatedByUser",
        attributes: ["id", "name", "email"],
        raw: true,
      },
    ],
    where: {
      createdBy: userId,
    },
    order: [[sortBy || "id", sortDirection?.toUpperCase() || "DESC"]],
    ...(limit && { limit }),
    ...(page && { offset: limit * page }),
    raw: true,
  };

  // Add dynamic filters
  if (searchOptions && typeof searchOptions === "object") {
    for (const [key, values] of Object.entries(searchOptions)) {
      if (Array.isArray(values) && values.length > 0) {
        const likeArray = values.map((val) => ({ [Op.like]: `%${val}%` }));

        if (key === "createdBy") {
          query.include[0].where = {
            name: { [Op.or]: likeArray },
          };
        } else if (key === "updatedBy") {
          query.include[1].where = {
            name: { [Op.or]: likeArray },
          };
        } else {
          query.where[key] = { [Op.or]: likeArray };
        }
      }
    }
  }

  try {
    const data = await req.db.User.findAll(query);
    success(res, data, "Successfully Fetched Data", 200);
  } catch (err) {
    console.log(err, "Error");
    let errorType = await checkErrorType(err);

    failure(
      res,
      errorType.displayMsg ? errorType.displayMsg : errorType.msg,
      500
    );
  }
};

exports.deleteUsers = async (req, res) => {
  const { id } = req.body;

  const t = await req.db.seq.transaction();

  try {
    await req.db.Task.destroy({
      where: {
        createdBy: id,
      },
      transaction: t,
    });

    let data = await req.db.User.destroy({
      where: {
        id,
      },
      transaction: t,
    });

    t.commit();
    if (data) {
      success(
        res,
        {
          deleted: true,
        },
        "User Deleted Successfully"
      );
    } else {
      success(
        res,
        {
          deleted: false,
        },
        "No User Deleted"
      );
    }
  } catch (err) {
    console.log(err, "Error");
    let errorType = await checkErrorType(err);
    t.rollback();
    failure(
      res,
      errorType.displayMsg ? errorType.displayMsg : errorType.msg,
      500
    );
  }
};

exports.updateDetails = async (req, res) => {
  const { name, email, role, id } = req.body;
  const { userId } = req.payload;
  const t = await req.db.seq.transaction();

  try {
    let data = await req.db.User.update(
      {
        name,
        email,
        role,
        updatedBy: userId,
      },
      {
        where: {
          id,
        },
        transaction: t,
      }
    );
    t.commit();

    success(res, data, "Successfully Updated", 200);
  } catch (err) {
    console.log(err, "Error");
    let errorType = await checkErrorType(err);
    t.rollback();
    failure(
      res,
      errorType.displayMsg ? errorType.displayMsg : errorType.msg,
      500
    );
  }
};

exports.updatePassword = async (req, res) => {
  const { password, id } = req.body;
  const { userId } = req.payload;
  const t = await req.db.seq.transaction();

  try {
    let data = await req.db.User.update(
      {
        password: sha256(password + process.env.BSALT),
        updatedBy: userId,
      },
      {
        where: {
          id,
        },
        transaction: t,
      }
    );
    t.commit();
    success(res, data, "Successfully Updated", 200);
  } catch (err) {
    console.log(err, "Error");
    let errorType = await checkErrorType(err);
    t.rollback();
    failure(
      res,
      errorType.displayMsg ? errorType.displayMsg : errorType.msg,
      500
    );
  }
};
