"use strict";

require("core-js/modules/es.promise.js");
var _react = require("@testing-library/react");
var _chipCard = require("../components/chip-card");
require("@testing-library/jest-dom");
test("displays chips with buttons", async () => {
  (0, _react.render)( /*#__PURE__*/React.createElement(_chipCard.ChipCard, {
    displayChipList: [{
      preferenceId: "asdflweignirn5",
      value: "dairy",
      userType: "patient"
    }, {
      preferenceId: "asdflwe4543ignirn5",
      value: "lettuce",
      userType: "provider"
    }],
    parentFn: string => {}
  }));
  expect(await _react.screen.findByText("dairy")).toBeInTheDocument();
  expect(await _react.screen.findByText("lettuce")).toBeInTheDocument();
  const dairyButton = await _react.screen.getByRole("button", {
    name: "dairy"
  });
  expect(dairyButton).toBeEnabled();
  const lettuceButton = await _react.screen.getByRole("button", {
    name: "lettuce"
  });
  expect(lettuceButton).toBeDisabled();
});