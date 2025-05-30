"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var jwt = require("jsonwebtoken");
var _require = require("../utility/response"),
  failure = _require.failure,
  success = _require.success;
var _require2 = require("../utility/errorType"),
  checkErrorType = _require2.checkErrorType;
var _require3 = require("js-sha256"),
  sha256 = _require3.sha256;
exports.login = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, email, password, data, token, errorType;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return req.db.User.findOne({
            where: {
              email: email
            },
            raw: true
          });
        case 4:
          data = _context.sent;
          if (data) {
            _context.next = 8;
            break;
          }
          failure(res, "User Not Registered", 400, null);
          return _context.abrupt("return");
        case 8:
          if (!(data.password !== sha256(password + process.env.BSALT))) {
            _context.next = 11;
            break;
          }
          failure(res, "Password is incorrect", 401, null);
          return _context.abrupt("return");
        case 11:
          if (data) {
            token = jwt.sign({
              userId: data.id,
              role: data.role,
              name: data.name,
              email: data.email
            }, process.env.HASH_SECRECT, {
              expiresIn: "7d"
            });
            delete data["password"];
            success(res, _objectSpread(_objectSpread({}, data), {}, {
              token: token
            }), "Successfully Logged In", 200);
          }
          _context.next = 21;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          _context.next = 19;
          return checkErrorType(_context.t0);
        case 19:
          errorType = _context.sent;
          failure(res, errorType.displayMsg ? errorType.displayMsg : errorType.msg, 500);
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 14]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();