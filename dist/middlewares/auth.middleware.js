"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var jwt = require("jsonwebtoken");
module.exports = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var payload;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          if (req.headers.authorization) {
            _context.next = 3;
            break;
          }
          throw "Unauthorized!!";
        case 3:
          payload = jwt.verify(req.headers.authorization, process.env.HASH_SECRECT);
          req.payload = payload;
          next();
          _context.next = 12;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(401).json({
            code: 401,
            message: "Unauthorized",
            displayMsg: (_context.t0 === null || _context.t0 === void 0 ? void 0 : _context.t0.message) === "jwt expired" ? "Session expired. Please log in again." : "Unauthorized token. Please log in again."
          });
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();