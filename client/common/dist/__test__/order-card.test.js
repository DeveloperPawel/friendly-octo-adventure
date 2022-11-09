"use strict";

require("core-js/modules/es.promise.js");
var _react = require("@testing-library/react");
var _orderCard = require("../components/order-card");
require("@testing-library/jest-dom");
test("displays the current order", async () => {
  (0, _react.render)( /*#__PURE__*/React.createElement(_orderCard.OrderCard, {
    patientOrder: {
      breakfast: {
        entreeId: "234n4l345n324ln54",
        name: "eggs",
        foodItems: [{
          foodItemId: "asdfasdfasdf",
          name: "egg",
          ingredients: [{
            ingredientId: "asasdflientient",
            name: "egg"
          }]
        }]
      },
      lunch: {
        entreeId: "234uuuun4l345n324ln54",
        name: "sandwich",
        foodItems: [{
          foodItemId: "asdfasdfasdf",
          name: "egg",
          ingredients: [{
            ingredientId: "asasdflientient",
            name: "egg"
          }]
        }]
      },
      dinner: {
        entreeId: "234n4l345n324lng54",
        name: "steak and eggs",
        foodItems: [{
          foodItemId: "asdfasdfasdf",
          name: "egg",
          ingredients: [{
            ingredientId: "asasdflientient",
            name: "egg"
          }]
        }, {
          foodItemId: "aggsdfasdfasdf",
          name: "steak",
          ingredients: [{
            ingredientId: "asasdflggientient",
            name: "beef"
          }]
        }]
      },
      patinetId: "234n4l345n324ln54",
      orderId: "asdflasdkfnurngjd",
      date: new Date()
    }
  }));

  // expect(await screen.findByText("egg")).toBeInTheDocument();
  expect(await _react.screen.findByText("sandwich")).toBeInTheDocument();
  expect(await _react.screen.findByText("steak")).toBeInTheDocument();
  expect(await _react.screen.findByText("beef")).toBeInTheDocument();
  const removebuttons = await _react.screen.queryAllByText("Remove");
  expect(removebuttons).toHaveLength(3);
});