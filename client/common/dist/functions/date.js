"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDateAlpha = formatDateAlpha;
require("core-js/modules/es.regexp.to-string.js");
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}
function formatDateAlpha(date) {
  return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join("-");
}