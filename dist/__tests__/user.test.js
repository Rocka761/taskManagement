"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _require = require("@jest/globals"),
  beforeAll = _require.beforeAll,
  describe = _require.describe,
  it = _require.it;
var request = require("supertest");
var app = require("../app");
var token = null;
beforeAll(/*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var _res$body;
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
        token = (_res$body = res.body) === null || _res$body === void 0 || (_res$body = _res$body.data) === null || _res$body === void 0 ? void 0 : _res$body.token;
        console.log(token);
      case 5:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
describe("User ", function () {
  it("Create User", /*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return request(app).post("/user/create").send({});
        case 2:
          res = _context2.sent;
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
});