"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
exports.checkErrorType = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(e) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(e.name == "SequelizeUniqueConstraintError")) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", {
            code: 603,
            status: false,
            msg: "Duplicate Entry",
            displayMsg: e.errors[0].message,
            customError: false,
            data: null
          });
        case 4:
          if (!(e.name == "SequelizeForeignKeyConstraintError")) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", {
            code: 604,
            status: false,
            msg: "DB Relation Error",
            customError: false,
            data: null
          });
        case 8:
          return _context.abrupt("return", {
            code: 602,
            status: false,
            customError: false,
            msg: "DB Error",
            data: null
          });
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();