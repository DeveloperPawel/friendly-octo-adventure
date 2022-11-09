import React from "react";

export const OrderCard = ({ patientOrder, parentFn }) => {
  let breakfastIngredients = [];
  let lunchIngredients = [];
  let dinnerIngredients = [];

  return (
    <>
      {patientOrder.breakfast ? (
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">{patientOrder.breakfast.name}</h5>
            <p className="card-text">
              {patientOrder.breakfast.foodItems.map((foodItem, index) => {
                breakfastIngredients = [
                  ...breakfastIngredients,
                  ...foodItem.ingredients,
                ];
                return <span key={index}>{foodItem.name}</span>;
              })}
            </p>
            <p>
              ingredients:{" "}
              {breakfastIngredients.map((ingredient, index) => {
                return <span key={index}>{ingredient.name}</span>;
              })}
            </p>
            <button
              onClick={() =>
                parentFn({
                  entreeId: patientOrder.breakfast.entreeId,
                  key: "breakfast",
                })
              }
              href="#"
              className="btn btn-primary"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="card text-center">
          <div className="card-body">
            <h5>Breakfast</h5>
          </div>
        </div>
      )}
      {patientOrder.lunch ? (
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">{patientOrder.lunch.name}</h5>
            <p className="card-text">
              {patientOrder.lunch.foodItems.map((foodItem, index) => {
                lunchIngredients = [
                  ...lunchIngredients,
                  ...foodItem.ingredients,
                ];
                return <span key={index}>{foodItem.name}</span>;
              })}
            </p>
            <p>
              ingredients:{" "}
              {lunchIngredients.map((ingredient, index) => {
                return <span key={index}>{ingredient.name}</span>;
              })}
            </p>
            <button
              onClick={() =>
                parentFn({
                  entreeId: patientOrder.lunch.entreeId,
                  key: "lunch",
                })
              }
              href="#"
              className="btn btn-primary"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="card text-center">
          <div className="card-body">
            <h5>Lunch</h5>
          </div>
        </div>
      )}
      {patientOrder.dinner ? (
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">{patientOrder.dinner.name}</h5>
            <p className="card-text">
              {patientOrder.dinner.foodItems.map((foodItem, index) => {
                dinnerIngredients = [
                  ...dinnerIngredients,
                  ...foodItem.ingredients,
                ];
                return <span key={index}>{foodItem.name}</span>;
              })}
            </p>
            <p>
              ingredients:{" "}
              {dinnerIngredients.map((ingredient, index) => {
                return <span key={index}>{ingredient.name}</span>;
              })}
            </p>
            <button
              onClick={() =>
                parentFn({
                  entreeId: patientOrder.dinner.entreeId,
                  key: "dinner",
                })
              }
              href="#"
              className="btn btn-primary"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="card text-center">
          <div className="card-body">
            <h5>Dinner</h5>
          </div>
        </div>
      )}
    </>
  );
};
