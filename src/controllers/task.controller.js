const { checkErrorType } = require("../utility/errorType");
const { failure, success } = require("../utility/response");

exports.create = async (req, res) => {
  const { name, description } = req.body;
  const { userId } = req.payload;

  const t = await req.db.seq.transaction();

  try {
    let data = await req.db.Task.create(
      {
        name,
        description,
        createdBy: userId,
      },
      {
        transaction: t,
      }
    );

    data = data.get({ plain: true });
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

exports.delete = async (req, res) => {
  const { id } = req.body;

  const t = await req.db.seq.transaction();

  try {
    let data = await req.db.Task.destroy({
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
        "Task Deleted Successfully"
      );
    } else {
      success(
        res,
        {
          deleted: false,
        },
        "No task Deleted"
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

exports.updateStatus = async (req, res) => {
  const { status, remarks, id } = req.body;
  const { userId } = req.payload;
  const t = await req.db.seq.transaction();

  try {
    let data = await req.db.Task.update(
      {
        status,
        remarks,
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

    success(res, data, "Task Status Successfully Updated", 200);
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
  const { name, description, status, remarks, id } = req.body;
  const { userId } = req.payload;
  const t = await req.db.seq.transaction();

  try {
    let data = await req.db.Task.update(
      {
        name,
        description,
        status,
        remarks,
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

    success(res, data, "Task Successfully Updated", 200);
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

exports.getList = async (req, res) => {
  const { searchOptions, limit, page, sortBy, sortDirection } = req.body;
  const { userId } = req.payload;

  // Base query
  let query = {
    attributes: [
      "id",
      "name",
      "status",
      "description",
      "remarks",
      "createdBy",
      "updatedBy",
    ],
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
    const data = await req.db.Task.findAll(query);
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
