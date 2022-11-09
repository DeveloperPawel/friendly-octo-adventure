"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatientAccordian = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
var _react = _interopRequireWildcard(require("react"));
var _Accordion = _interopRequireDefault(require("@mui/material/Accordion"));
var _AccordionDetails = _interopRequireDefault(require("@mui/material/AccordionDetails"));
var _AccordionSummary = _interopRequireDefault(require("@mui/material/AccordionSummary"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _ExpandMore = _interopRequireDefault(require("@mui/icons-material/ExpandMore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const PatientAccordian = _ref => {
  let {
    patients,
    day
  } = _ref;
  const [patientTable, setPatientTable] = (0, _react.useState)({});
  const [entreeTable, setEntreeTable] = (0, _react.useState)({
    breakfast: [],
    lunch: [],
    dinner: []
  });
  const [expanded, setExpanded] = _react.default.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  (0, _react.useEffect)(() => {
    formatPatientData(patients, day.date);
    formatDayData(day);
  }, []);
  const formatPatientData = (patientsData, date) => {
    let patientTable = {};
    for (const patient of patientsData) {
      for (let index = 0; index < patient.orders.length; index++) {
        if (patient.orders[index].date.toString() === date.toString()) {
          patientTable[patient.patientId] = index;
          break;
        }
      }
    }
    setPatientTable(patientTable);
  };
  const formatDayData = dayData => {
    let dayTable = {
      breakfast: [],
      lunch: [],
      dinner: []
    };
    for (const entree of dayData.breakfast) {
      dayTable.breakfast.push(entree.entreeId);
    }
    for (const entree of dayData.lunch) {
      dayTable.lunch.push(entree.entreeId);
    }
    for (const entree of dayData.dinner) {
      dayTable.dinner.push(entree.entreeId);
    }
    setEntreeTable(dayTable);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "accordion"
  }, patients.map((patient, index) => {
    return /*#__PURE__*/_react.default.createElement(_Accordion.default, {
      key: index,
      expanded: expanded === "patient".concat(index),
      onChange: handleChange("patient".concat(index))
    }, /*#__PURE__*/_react.default.createElement(_AccordionSummary.default, {
      expandIcon: /*#__PURE__*/_react.default.createElement(_ExpandMore.default, null),
      "aria-controls": "panel1bh-content",
      id: "panel1bh-header"
    }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
      sx: {
        width: "33%",
        flexShrink: 0
      }
    }, "patient ".concat(index + 1)), /*#__PURE__*/_react.default.createElement(_Typography.default, {
      sx: {
        color: entreeTable.breakfast.includes(patient.orders && patientTable[patient.patientId] !== undefined ? patient.orders[patientTable[patient.patientId]].breakfast : "") ? "green" : "red",
        width: "25%"
      }
    }, "Breakfast"), /*#__PURE__*/_react.default.createElement(_Typography.default, {
      sx: {
        color: entreeTable.lunch.includes(patient.orders && patientTable[patient.patientId] !== undefined ? patient.orders[patientTable[patient.patientId]].lunch : "") ? "green" : "red",
        width: "20%"
      }
    }, "Lunch"), /*#__PURE__*/_react.default.createElement(_Typography.default, {
      sx: {
        color: entreeTable.dinner.includes(patient.orders && patientTable[patient.patientId] !== undefined ? patient.orders[patientTable[patient.patientId]].dinner : "") ? "green" : "red",
        width: "50%"
      }
    }, "Dinner")), /*#__PURE__*/_react.default.createElement(_AccordionDetails.default, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h1", null, "Hello"))));
  }));
};
exports.PatientAccordian = PatientAccordian;