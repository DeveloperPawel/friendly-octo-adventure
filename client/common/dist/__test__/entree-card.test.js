"use strict";

require("core-js/modules/es.promise.js");
var _react = require("@testing-library/react");
var _entreeCard = require("../components/entree-card");
require("@testing-library/jest-dom");
test("displays food options", async () => {
  (0, _react.render)( /*#__PURE__*/React.createElement(_entreeCard.EntreeCard, {
    mealLabel: "breakfast",
    patientOrder: "234n4l345n324ln54",
    entreeList: [{
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
    }, {
      entreeId: "234n4l345n8888324ln54",
      name: "toast",
      foodItems: [{
        foodItemId: "asdfasdf9asdf",
        name: "bread",
        ingredients: [{
          ingredientId: "asasdfli9999entient",
          name: "flour"
        }]
      }]
    }]
  }));
  expect(await _react.screen.findByText("breakfast")).toBeInTheDocument();
  expect(await _react.screen.findByText("eggs")).toBeInTheDocument();
  expect(await _react.screen.findByText("toast")).toBeInTheDocument();
  expect(await _react.screen.findByText("bread")).toBeInTheDocument();
  expect(await _react.screen.findByText("flour")).toBeInTheDocument();
  const foodSelectButtons = await _react.screen.queryAllByText("Select");
  expect(foodSelectButtons).toHaveLength(2);
});
test("displays selected food disabled", async () => {
  (0, _react.render)( /*#__PURE__*/React.createElement(_entreeCard.EntreeCard, {
    mealLabel: "breakfast",
    patientOrder: "234n4l345n324ln54",
    entreeList: [{
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
    }, {
      entreeId: "234n4l345n8888324ln54",
      name: "toast",
      foodItems: [{
        foodItemId: "asdfasdf9asdf",
        name: "bread",
        ingredients: [{
          ingredientId: "asasdfli9999entient",
          name: "flour"
        }]
      }]
    }]
  }));
  const eqqsButton = await _react.screen.getByRole("button", {
    name: "eggs"
  });
  const toastButton = await _react.screen.getByRole("button", {
    name: "toast"
  });
  expect(toastButton).toBeEnabled();
  expect(eqqsButton).toBeDisabled();
});