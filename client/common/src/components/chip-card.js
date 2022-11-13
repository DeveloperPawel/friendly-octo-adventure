import React from "react";

export const ChipCard = ({ displayChipList, parentFn }) => {
  const populateButtonData = (chip, index) => {
    return (
      <button
        onClick={() =>
          parentFn(chip.preferenceId ? chip.preferenceId : chip.restrictionId)
        }
        aria-label={chip.value}
        key={index}
        type="button"
        disabled={!(chip.userType === "patient")}
        className="btn btn-primary position-relative"
      >
        {chip.value}
      </button>
    );
  };

  return displayChipList.map((chip, index) => {
    return populateButtonData(chip, index);
  });
};
