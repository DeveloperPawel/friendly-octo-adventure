import React, { useEffect, useState, lazy, Suspense } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { OrderCard } from "./order-card";
import Paper from "@mui/material/Paper";

export const PatientAccordian = ({ patients, day }) => {
  const [patientTable, setPatientTable] = useState({});
  const [entreeTable, setEntreeTable] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
          <Accordion
            key={index}
            expanded={expanded === `patient${index}`}
            onChange={handleChange(`patient${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {`patient ${index + 1}`}
              </Typography>
              <Typography
                sx={{
                  color: entreeTable.breakfast.includes(
                    patient.orders &&
                      patientTable[patient.patientId] !== undefined
                      ? patient.orders[patientTable[patient.patientId]]
                          .breakfast
                      : ""
                  )
                    ? "green"
                    : "red",
                  width: "25%",
                }}
              >
                Breakfast
              </Typography>
              <Typography
                sx={{
                  color: entreeTable.lunch.includes(
                    patient.orders &&
                      patientTable[patient.patientId] !== undefined
                      ? patient.orders[patientTable[patient.patientId]].lunch
                      : ""
                  )
                    ? "green"
                    : "red",
                  width: "20%",
                }}
              >
                Lunch
              </Typography>
              <Typography
                sx={{
                  color: entreeTable.dinner.includes(
                    patient.orders &&
                      patientTable[patient.patientId] !== undefined
                      ? patient.orders[patientTable[patient.patientId]].dinner
                      : ""
                  )
                    ? "green"
                    : "red",
                  width: "50%",
                }}
              >
                Dinner
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Paper>
                {patient.orders &&
                patientTable[patient.patientId] !== undefined ? (
                  <OrderCard
                    patientOrder={
                      patient.orders[patientTable[patient.patientId]]
                    }
                    day={day}
                  />
                ) : (
                  <span>No order found.</span>
                )}
              </Paper>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};
