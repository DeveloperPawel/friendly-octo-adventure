"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChipCard = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ChipCard = _ref => {
  let {
    displayChipList,
    parentFn
  } = _ref;
  const populateButtonData = (chip, index) => {
    return /*#__PURE__*/_react.default.createElement("button", {
      onClick: () => parentFn(chip.preferenceId),
      "aria-label": chip.value,
      key: index,
      type: "button",
      disabled: !(chip.userType === "patient"),
      className: "btn btn-primary position-relative"
    }, chip.value);
  };
  return displayChipList.map((chip, index) => {
    return populateButtonData(chip, index);
  });
};
exports.ChipCard = ChipCard;