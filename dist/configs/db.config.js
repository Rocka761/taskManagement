"use strict";

require("dotenv").config(); // ✅ load .env variables early

var master = {
  main_db_name: process.env.DB_NAME,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  main_db_options: {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    timezone: "+05:30",
    logging: false,
    // or custom logger like console.log
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: false,
      paranoid: false,
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci"
    }
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false, // change based on need
    //   },
    //   useUTC: false,
    //   dateStrings: true,
    //   typeCast: true,
    // },
  }
};
module.exports = {
  master: master
};