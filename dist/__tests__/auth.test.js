"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var request = require("supertest");
var db = require("../configs/db");
var _require = require("@jest/globals"),
  describe = _require.describe,
  it = _require.it,
  expect = _require.expect;
var app = require("../app");
describe("Auth", function () {
  it("Login", /*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var res;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return request(app).post("/auth/login").send({
            email: "venkatesh@riota.in",
            password: "c0c2d707b8d4766268d96313733ee0c007ea6e4271e4666a8c6cea2a9a34f6ea"
          });
        case 2:
          res = _context.sent;
          expect(res.statusCode).toBe(200);
          expect(res.body.data).toHaveProperty("token");
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  it("Not Registered User", /*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return request(app).post("/auth/login").send({
            email: "veera@riota.in",
            password: "c0c2d707b8d4766268d96313733ee0c007ea6e4271e4666a8c6cea2a9a34f6ea"
          });
        case 2:
          res = _context2.sent;
          expect(res.statusCode).toBe(400);
          expect(res.body.message).toMatch(/Not Registered/i);
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  it("Wrong Login Password", /*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var res;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return request(app).post("/auth/login").send({
            email: "venkatesh@riota.in",
            password: "c0c2d707b8d4766268d96313733ee0c007ea6e4271e4666a8c6cea2a9a34f6easdsd"
          });
        case 2:
          res = _context3.sent;
          expect(res.statusCode).toBe(401);
          expect(res.body.message).toMatch(/incorrect/i);
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  it("Missing Email", /*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var res;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return request(app).post("/auth/login").send({
            password: "c0c2d707b8d4766268d96313733ee0c007ea6e4271e4666a8c6cea2a9a34f6easdsd"
          });
        case 2:
          res = _context4.sent;
          expect(res.statusCode).toBe(400);
          expect(res.body.success).toBe(false);
          expect(res.body.message).toBe("Validation Failed");
          expect(Array.isArray(res.body.error)).toBe(true);
          expect(res.body.error[0]).toMatch(/email.*required/i);
        case 8:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  it("Missing Password", /*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var res;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return request(app).post("/auth/login").send({
            email: "venkatesh@riota.in"
          });
        case 2:
          res = _context5.sent;
          expect(res.statusCode).toBe(400);
          expect(res.body.success).toBe(false);
          expect(res.body.message).toBe("Validation Failed");
          expect(Array.isArray(res.body.error)).toBe(true);
          expect(res.body.error[0]).toMatch(/password.*required/i);
        case 8:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
});