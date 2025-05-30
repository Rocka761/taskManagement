exports.checkErrorType = async (e) => {
  if (e.name == "SequelizeUniqueConstraintError") {
    return {
      code: 603,
      status: false,
      msg: "Duplicate Entry",
      displayMsg: e.errors[0].message,
      customError: false,
      data: null,
    };
  } else if (e.name == "SequelizeForeignKeyConstraintError") {
    return {
      code: 604,
      status: false,
      msg: "DB Relation Error",
      customError: false,
      data: null,
    };
  } else {
    return {
      code: 602,
      status: false,
      customError: false,
      msg: "DB Error",
      data: null,
    };
  }
};
