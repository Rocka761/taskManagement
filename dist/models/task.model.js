"use strict";

module.exports = function (sequelize, dataTypes) {
  var Task = sequelize.define("task", {
    id: {
      field: "id",
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      field: "name",
      type: dataTypes.STRING,
      allowNull: false
    },
    description: {
      field: "description",
      type: dataTypes.STRING,
      allowNull: false
    },
    status: {
      field: "status",
      type: dataTypes.ENUM("Created", "In-Progress", "Completed", "Failed"),
      allowNull: false,
      defaultValue: "Created"
    },
    remarks: {
      field: "remarks",
      type: dataTypes.STRING,
      allowNull: true
    },
    createdBy: {
      field: "createdBy",
      type: dataTypes.INTEGER,
      allowNull: false
    },
    updatedBy: {
      field: "updatedBy",
      type: dataTypes.INTEGER,
      allowNull: true
    }
  });
  return Task;
};