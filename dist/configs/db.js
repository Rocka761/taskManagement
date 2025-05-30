"use strict";

/**
 * Imports
 */

var Sequelize = require("sequelize");
var _require = require("./db.config"),
  master = _require.master;
var sequelize = new Sequelize(master.main_db_name, master.username, master.password, master.main_db_options);
var db = {
  seqlib: Sequelize,
  seq: sequelize,
  User: require("../models/user.model")(sequelize, Sequelize),
  Task: require("../models/task.model")(sequelize, Sequelize)
};

/**
 * User Relationship
 */

db.User.hasMany(db.User, {
  foreignKey: "createdBy",
  sourceKey: "id",
  onDelete: "NO ACTION"
});
db.User.belongsTo(db.User, {
  foreignKey: "createdBy",
  targetKey: "id",
  as: "createdByUser"
});
db.User.hasMany(db.User, {
  foreignKey: "updatedBy",
  sourceKey: "id",
  onDelete: "NO ACTION"
});
db.User.belongsTo(db.User, {
  foreignKey: "updatedBy",
  targetKey: "id",
  as: "updatedByUser"
});

/**
 * Task Model Relationship
 */

db.User.hasMany(db.Task, {
  foreignKey: "createdBy",
  sourceKey: "id",
  onDelete: "NO ACTION"
});
db.Task.belongsTo(db.User, {
  foreignKey: "createdBy",
  targetKey: "id",
  as: "createdByUser"
});
db.User.hasMany(db.Task, {
  foreignKey: "updatedBy",
  sourceKey: "id",
  onDelete: "NO ACTION"
});
db.Task.belongsTo(db.User, {
  foreignKey: "updatedBy",
  targetKey: "id",
  as: "updatedByUser"
});
module.exports = db;