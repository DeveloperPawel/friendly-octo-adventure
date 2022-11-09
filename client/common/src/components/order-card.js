import React, { useState, useEffect } from "react";

export const OrderCard = ({ patientOrder, day, parentFn }) => {
  const [breakfastEntree, setBreakfastEntree] = useState(null);
  const [lunchEntree, setLunchEntree] = useState(null);
  const [dinnerEntree, setDinnerEntree] = useState(null);
  const [loading, setLoading] = useState(true);

  let breakfastIngredients = [];
  let lunchIngredients = [];
  let dinnerIngredients = [];

  useEffect(() => {
    populateData();
  }, []);

  const populateData = () => {
    for (const entree of day.breakfast) {
      if (entree.entreeId === patientOrder.breakfast) {
        setBreakfastEntree(entree);
        break;
      }
    }

    for (const entree of day.lunch) {
      if (entree.entreeId === patientOrder.lunch) {
        setLunchEntree(entree);
        break;
      }
    }

    for (const entree of day.dinner) {
      if (entree.entreeId === patientOrder.dinner) {
        setDinnerEntree(entree);
        break;
      }
    }

    setLoading(false);
  };

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      {breakfastEntree ? (
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">{breakfastEntree.name}</h5>
            <p className="card-text">
              {breakfastEntree.foodItems.map((foodItem, index) => {
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
                  entreeId: patientOrder.breakfast,
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
      {lunchEntree ? (
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">{lunchEntree.name}</h5>
            <p className="card-text">
              {lunchEntree.foodItems.map((foodItem, index) => {
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
                  entreeId: patientOrder.lunch,
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
      {dinnerEntree ? (
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">{dinnerEntree.name}</h5>
            <p className="card-text">
              {dinnerEntree.foodItems.map((foodItem, index) => {
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
                  entreeId: patientOrder.dinner,
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
