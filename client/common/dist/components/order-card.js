"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderCard = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const OrderCard = _ref => {
  let {
    patientOrder,
    parentFn
  } = _ref;
  let breakfastIngredients = [];
  let lunchIngredients = [];
  let dinnerIngredients = [];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, patientOrder.breakfast ? /*#__PURE__*/_react.default.createElement("div", {
    className: "card text-center"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/_react.default.createElement("h5", {
    className: "card-title"
  }, patientOrder.breakfast.name), /*#__PURE__*/_react.default.createElement("p", {
    className: "card-text"
  }, patientOrder.breakfast.foodItems.map((foodItem, index) => {
    breakfastIngredients = [...breakfastIngredients, ...foodItem.ingredients];
    return /*#__PURE__*/_react.default.createElement("span", {
      key: index
    }, foodItem.name);
  })), /*#__PURE__*/_react.default.createElement("p", null, "ingredients:", " ", breakfastIngredients.map((ingredient, index) => {
    return /*#__PURE__*/_react.default.createElement("span", {
      key: index
    }, ingredient.name);
  })), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => parentFn({
      entreeId: patientOrder.breakfast.entreeId,
      key: "breakfast"
    }),
    href: "#",
    className: "btn btn-primary"
  }, "Remove"))) : /*#__PURE__*/_react.default.createElement("div", {
    className: "card text-center"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/_react.default.createElement("h5", null, "Breakfast"))), patientOrder.lunch ? /*#__PURE__*/_react.default.createElement("div", {
    className: "card text-center"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/_react.default.createElement("h5", {
    className: "card-title"
  }, patientOrder.lunch.name), /*#__PURE__*/_react.default.createElement("p", {
    className: "card-text"
  }, patientOrder.lunch.foodItems.map((foodItem, index) => {
    lunchIngredients = [...lunchIngredients, ...foodItem.ingredients];
    return /*#__PURE__*/_react.default.createElement("span", {
      key: index
    }, foodItem.name);
  })), /*#__PURE__*/_react.default.createElement("p", null, "ingredients:", " ", lunchIngredients.map((ingredient, index) => {
    return /*#__PURE__*/_react.default.createElement("span", {
      key: index
    }, ingredient.name);
  })), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => parentFn({
      entreeId: patientOrder.lunch.entreeId,
      key: "lunch"
    }),
    href: "#",
    className: "btn btn-primary"
  }, "Remove"))) : /*#__PURE__*/_react.default.createElement("div", {
    className: "card text-center"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/_react.default.createElement("h5", null, "Lunch"))), patientOrder.dinner ? /*#__PURE__*/_react.default.createElement("div", {
    className: "card text-center"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/_react.default.createElement("h5", {
    className: "card-title"
  }, patientOrder.dinner.name), /*#__PURE__*/_react.default.createElement("p", {
    className: "card-text"
  }, patientOrder.dinner.foodItems.map((foodItem, index) => {
    dinnerIngredients = [...dinnerIngredients, ...foodItem.ingredients];
    return /*#__PURE__*/_react.default.createElement("span", {
      key: index
    }, foodItem.name);
  })), /*#__PURE__*/_react.default.createElement("p", null, "ingredients:", " ", dinnerIngredients.map((ingredient, index) => {
    return /*#__PURE__*/_react.default.createElement("span", {
      key: index
    }, ingredient.name);
  })), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => parentFn({
      entreeId: patientOrder.dinner.entreeId,
      key: "dinner"
    }),
    href: "#",
    className: "btn btn-primary"
  }, "Remove"))) : /*#__PURE__*/_react.default.createElement("div", {
    className: "card text-center"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/_react.default.createElement("h5", null, "Dinner"))));
};
exports.OrderCard = OrderCard;