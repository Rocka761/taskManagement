module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define("user", {
    id: {
      field: "id",
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      field: "name",
      type: dataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      field: "email",
      type: dataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      field: "password",
      type: dataTypes.STRING,
      allowNull: false,
    },
    role: {
      field: "role",
      type: dataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
    createdBy: {
      field: "createdBy",
      type: dataTypes.INTEGER,
      allowNull: true,
    },
    updatedBy: {
      field: "updatedBy",
      type: dataTypes.INTEGER,
      allowNull: true,
    },
  });
  return User;
};
