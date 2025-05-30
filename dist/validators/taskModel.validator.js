"use strict";

var Joi = require("joi");
exports.createTaskSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(30).required()
});
exports.updateTaskSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(30).required(),
  id: Joi.number().integer().positive().required()
});
exports.deleteTaskSchema = Joi.object({
  id: Joi.number().integer().positive().required()
});
exports.updateTaskStatusSchema = Joi.object({
  status: Joi.string().valid("In-Progress", "Completed", "Failed").required(),
  remarks: Joi.string().min(10).required(),
  id: Joi.number().integer().positive().required()
});
exports.getTaskSchema = Joi.object({
  searchOptions: Joi.object({
    name: Joi.array().items(Joi.string()).optional(),
    id: Joi.array().items(Joi.number().integer().positive()).optional(),
    status: Joi.array().items(Joi.string().email()).optional()
  }).required(),
  limit: Joi.number().integer().positive().required(),
  page: Joi.number().required(),
  sortBy: Joi.string().required(),
  sortDirection: Joi.string().valid("ASC", "DESC").required() // you can restrict values if needed
});