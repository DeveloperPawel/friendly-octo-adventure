import React, { useEffect, useState } from "react";

export const PatientAccordian = ({ patients, day }) => {
  const [patientTable, setPatientTable] = useState({});
  const [entreeTable, setEntreeTable] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });

  useEffect(() => {
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
  const formatDayData = (dayData) => {
    let dayTable = {
      breakfast: [],
      lunch: [],
      dinner: [],
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

  return (
    <div className="accordion">
      {patients.map((patient, index) => {
        return (
          <div key={index} className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                {`patient ${index + 1} `}
                <span
                  style={{
                    color: entreeTable.breakfast.includes(
                      patient.orders &&
                        patientTable[patient.patientId] !== undefined
                        ? patient.orders[patientTable[patient.patientId]]
                            .breakfast
                        : ""
                    )
                      ? "green"
                      : "red",
                  }}
                >
                  Breakfast
                </span>{" "}
                <span
                  style={{
                    color: entreeTable.lunch.includes(
                      patient.orders &&
                        patientTable[patient.patientId] !== undefined
                        ? patient.orders[patientTable[patient.patientId]].lunch
                        : ""
                    )
                      ? "green"
                      : "red",
                  }}
                >
                  Lunch
                </span>{" "}
                <span
                  style={{
                    color: entreeTable.dinner.includes(
                      patient.orders &&
                        patientTable[patient.patientId] !== undefined
                        ? patient.orders[patientTable[patient.patientId]].dinner
                        : ""
                    )
                      ? "green"
                      : "red",
                  }}
                >
                  Dinner
                </span>
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="panelsStayOpen-headingOne"
            >
              <div className="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is
                shown by default, until the collapse plugin adds the appropriate
                classNamees that we use to styles each element. These
                classNamees control the overall appearance, as well as the
                showing and hiding via CSS transitions. You can modify any of
                this with custom CSS or overriding our default variables. It's
                also worth noting that just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
