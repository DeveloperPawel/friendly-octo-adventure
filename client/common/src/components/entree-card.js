import React from "react";

export const EntreeCard = ({
  mealLabel,
  entreeList,
  patientEntreeId,
  parentFn,
}) => {
  return (
    <>
      <h3>{mealLabel}</h3>
      {entreeList.map((entree, index) => {
        let ingredientList = [];
        return (
          <div key={index} className="card text-center">
            <div className="card-body">
              <h5 className="card-title">{entree.name}</h5>
              <p className="card-text">
                {entree.foodItems.map((foodItem, index) => {
                  ingredientList = [...ingredientList, ...foodItem.ingredients];
                  return <span key={index}>{foodItem.name + " "}</span>;
                })}
              </p>
              <p className="card-text">
                ingredients:{" "}
                {ingredientList.map((ingredient, index) => {
                  return <span key={index}>{ingredient.name + " "}</span>;
                })}
              </p>
              <button
                onClick={() => parentFn(entree.entreeId)}
                aria-label={entree.entreeId}
                disabled={patientEntreeId == entree.entreeId}
                className="btn btn-primary"
              >
                Select
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};
