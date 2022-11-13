import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { ChipCard, OrderCard } from "@mimenu/client-common";
// import axios from "axios";

export const PatientDashBoard = ({ user }) => {
  const [Patient, setPatient] = useState(user);
  useEffect(() => {}, []);

  const removeEntree = ({ entreeId, key }) => {};
  const deletePreference = (preferenceId) => {};

  return (
    <div>
      <Paper>
        <h2>Preferences</h2>
        <ChipCard
          displayChipList={[
            { preferenceId: "asdfasd", value: "dairy", userType: "patient" },
          ]}
          parentFn={deletePreference}
        />
      </Paper>
      <Paper>
        <h2>Restrictions</h2>
        {/* <ChipCard /> */}
      </Paper>
      <Paper>
        <h2>Order</h2>
        <Paper>
          <h3>Breakfast</h3>
          {/* <OrderCard /> */}
        </Paper>
        <Paper>
          <h3>Lunch</h3>
          {/* <OrderCard /> */}
        </Paper>
        <Paper>
          <h3>Dinner</h3>
          {/* <OrderCard /> */}
        </Paper>
      </Paper>
    </div>
  );
};
