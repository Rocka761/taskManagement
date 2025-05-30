"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var _require = require("../utility/errorType"),
  checkErrorType = _require.checkErrorType;
var _require2 = require("../utility/response"),
  failure = _require2.failure,
  success = _require2.success;
exports.create = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, name, description, userId, t, data, errorType;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, description = _req$body.description;
          userId = req.payload.userId;
          _context.next = 4;
          return req.db.seq.transaction();
        case 4:
          t = _context.sent;
          _context.prev = 5;
          _context.next = 8;
          return req.db.Task.create({
            name: name,
            description: description,
            createdBy: userId
          }, {
            transaction: t
          });
        case 8:
          data = _context.sent;
          data = data.get({
            plain: true
          });
          t.commit();
          success(res, data, "Successfully Created", 200);
          _context.next = 22;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](5);
          console.log(_context.t0);
          _context.next = 19;
          return checkErrorType(_context.t0);
        case 19:
          errorType = _context.sent;
          t.rollback();
          failure(res, errorType.displayMsg ? errorType.displayMsg : errorType.msg, 500);
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 14]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports["delete"] = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, t, data, errorType;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.body.id;
          _context2.next = 3;
          return req.db.seq.transaction();
        case 3:
          t = _context2.sent;
          _context2.prev = 4;
          _context2.next = 7;
          return req.db.Task.destroy({
            where: {
              id: id
            },
            transaction: t
          });
        case 7:
          data = _context2.sent;
          t.commit();
          if (data) {
            success(res, {
              deleted: true
            }, "Task Deleted Successfully");
          } else {
            success(res, {
              deleted: false
            }, "No task Deleted");
          }
          _context2.next = 20;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](4);
          console.log(_context2.t0, "Error");
          _context2.next = 17;
          return checkErrorType(_context2.t0);
        case 17:
          errorType = _context2.sent;
          t.rollback();
          failure(res, errorType.displayMsg ? errorType.displayMsg : errorType.msg, 500);
        case 20:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 12]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.updateStatus = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body2, status, remarks, id, userId, t, data, errorType;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, status = _req$body2.status, remarks = _req$body2.remarks, id = _req$body2.id;
          userId = req.payload.userId;
          _context3.next = 4;
          return req.db.seq.transaction();
        case 4:
          t = _context3.sent;
          _context3.prev = 5;
          _context3.next = 8;
          return req.db.Task.update({
            status: status,
            remarks: remarks,
            updatedBy: userId
          }, {
            where: {
              id: id
            },
            transaction: t
          });
        case 8:
          data = _context3.sent;
          t.commit();
          success(res, data, "Task Status Successfully Updated", 200);
          _context3.next = 21;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](5);
          console.log(_context3.t0, "Error");
          _context3.next = 18;
          return checkErrorType(_context3.t0);
        case 18:
          errorType = _context3.sent;
          t.rollback();
          failure(res, errorType.displayMsg ? errorType.displayMsg : errorType.msg, 500);
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[5, 13]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.updateDetails = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body3, name, description, status, remarks, id, userId, t, data, errorType;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body3 = req.body, name = _req$body3.name, description = _req$body3.description, status = _req$body3.status, remarks = _req$body3.remarks, id = _req$body3.id;
          userId = req.payload.userId;
          _context4.next = 4;
          return req.db.seq.transaction();
        case 4:
          t = _context4.sent;
          _context4.prev = 5;
          _context4.next = 8;
          return req.db.Task.update({
            name: name,
            description: description,
            status: status,
            remarks: remarks,
            updatedBy: userId
          }, {
            where: {
              id: id
            },
            transaction: t
          });
        case 8:
          data = _context4.sent;
          t.commit();
          success(res, data, "Task Successfully Updated", 200);
          _context4.next = 21;
          break;
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](5);
          console.log(_context4.t0, "Error");
          _context4.next = 18;
          return checkErrorType(_context4.t0);
        case 18:
          errorType = _context4.sent;
          t.rollback();
          failure(res, errorType.displayMsg ? errorType.displayMsg : errorType.msg, 500);
        case 21:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[5, 13]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getList = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body4, searchOptions, limit, page, sortBy, sortDirection, userId, query, _i, _Object$entries, _Object$entries$_i, key, values, likeArray, data, errorType;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$body4 = req.body, searchOptions = _req$body4.searchOptions, limit = _req$body4.limit, page = _req$body4.page, sortBy = _req$body4.sortBy, sortDirection = _req$body4.sortDirection;
          userId = req.payload.userId; // Base query
          query = _objectSpread(_objectSpread(_objectSpread({
            attributes: ["id", "name", "status", "description", "remarks", "createdBy", "updatedBy"],
            include: [{
              model: req.db.User,
              as: "createdByUser",
              attributes: ["id", "name", "email"],
              raw: true
            }, {
              model: req.db.User,
              as: "updatedByUser",
              attributes: ["id", "name", "email"],
              raw: true
            }],
            where: {
              createdBy: userId
            },
            order: [[sortBy || "id", (sortDirection === null || sortDirection === void 0 ? void 0 : sortDirection.toUpperCase()) || "DESC"]]
          }, limit && {
            limit: limit
          }), page && {
            offset: limit * page
          }), {}, {
            raw: true
          }); // Add dynamic filters
          if (searchOptions && (0, _typeof2["default"])(searchOptions) === "object") {
            for (_i = 0, _Object$entries = Object.entries(searchOptions); _i < _Object$entries.length; _i++) {
              _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2), key = _Object$entries$_i[0], values = _Object$entries$_i[1];
              if (Array.isArray(values) && values.length > 0) {
                likeArray = values.map(function (val) {
                  return (0, _defineProperty2["default"])({}, Op.like, "%".concat(val, "%"));
                });
                if (key === "createdBy") {
                  query.include[0].where = {
                    name: (0, _defineProperty2["default"])({}, Op.or, likeArray)
                  };
                } else if (key === "updatedBy") {
                  query.include[1].where = {
                    name: (0, _defineProperty2["default"])({}, Op.or, likeArray)
                  };
                } else {
                  query.where[key] = (0, _defineProperty2["default"])({}, Op.or, likeArray);
                }
              }
            }
          }
          _context5.prev = 4;
          _context5.next = 7;
          return req.db.Task.findAll(query);
        case 7:
          data = _context5.sent;
          success(res, data, "Successfully Fetched Data", 200);
          _context5.next = 18;
          break;
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](4);
          console.log(_context5.t0, "Error");
          _context5.next = 16;
          return checkErrorType(_context5.t0);
        case 16:
          errorType = _context5.sent;
          failure(res, errorType.displayMsg ? errorType.displayMsg : errorType.msg, 500);
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[4, 11]]);
  }));
  return function (_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();