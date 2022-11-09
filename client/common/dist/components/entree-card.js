"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntreeCard = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const EntreeCard = _ref => {
  let {
    mealLabel,
    entreeList,
    patientOrder,
    parentFn
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("h3", null, mealLabel), entreeList.map((entree, index) => {
    let ingredientList = [];
    return /*#__PURE__*/_react.default.createElement("div", {
      key: index,
      className: "card text-center"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/_react.default.createElement("h5", {
      className: "card-title"
    }, entree.name), /*#__PURE__*/_react.default.createElement("p", {
      className: "card-text"
    }, entree.foodItems.map((foodItem, index) => {
      ingredientList = [...ingredientList, ...foodItem.ingredients];
      return /*#__PURE__*/_react.default.createElement("span", {
        key: index
      }, foodItem.name);
    })), /*#__PURE__*/_react.default.createElement("p", {
      className: "card-text"
    }, "ingredients:", " ", ingredientList.map((ingredient, index) => {
      return /*#__PURE__*/_react.default.createElement("span", {
        key: index
      }, ingredient.name);
    })), /*#__PURE__*/_react.default.createElement("button", {
      onClick: () => parentFn(entree.entreeId),
      "aria-label": entree.name,
      disabled: patientOrder == entree.entreeId,
      className: "btn btn-primary"
    }, "Select")));
  }));
};
exports.EntreeCard = EntreeCard;