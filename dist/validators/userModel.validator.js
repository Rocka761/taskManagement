"use strict";

var Joi = require("joi");
exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
exports.userCreationSchema = Joi.object({
  name: Joi.string().min(3).trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("user", "admin")
});
exports.deleteUserSchema = Joi.object({
  id: Joi.number().integer().positive().required()
});
exports.getUserSchema = Joi.object({
  searchOptions: Joi.object({
    name: Joi.array().items(Joi.string()).optional(),
    id: Joi.array().items(Joi.number().integer().positive()).optional(),
    email: Joi.array().items(Joi.string().email()).optional(),
    // mobile: Joi.array().items(Joi.string().pattern(/^\d+$/)).optional(), // assuming mobile numbers are numeric strings
    createdBy: Joi.array().items(Joi.string()).optional()
  }).required(),
  limit: Joi.number().integer().positive().required(),
  page: Joi.number().required(),
  sortBy: Joi.string().required(),
  sortDirection: Joi.string().valid("ASC", "DESC").required() // you can restrict values if needed
});
exports.updateUserSchema = Joi.object({
  name: Joi.string().min(3).trim().required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("user", "admin"),
  id: Joi.number().integer().positive().required()
});
exports.updateUserPasswordSchema = Joi.object({
  password: Joi.string().trim().required(),
  id: Joi.number().integer().positive().required()
});