import React, { useEffect, useState } from "react";
import { EntreeCard, PatientAccordian } from "@mimenu/client-common";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const patients = [
  {
    patientId: "635e207d10c248095e78ce51",
    orders: [
      {
        id: "635e207d10c248095e78ce52",
        breakfast: "635e207d10c248095e78ce4e",
        lunch: "635e2s07d10c248095e7sd8ce4e",
        dinner: "635e2ssd0s7d10c248095e7sd8ce4e",
        date: new Date("11-11-01"),
        patientId: "635e207d10c248095e78ce51",
        orderId: "635e207d10c248095e78ce50",
      },
    ],
    preferences: [],
    restrictions: [],
    id: "635e207d10c248095e78ce54",
  },
  {
    patientId: "635e207d10c248adfe095e78ce51",
    orders: [
      {
        id: "635e207d10c248095e78ce52",
        breakfast: "s635e207d10c248095e78ce4e",
        lunch: "635e2s07d10c2480d95e7sd8ce4e",
        dinner: "635e2sesd0s7d10c248095e7sd8ce4e",
        date: new Date("11-11-01"),
        patientId: "635e207d10c248095e78ce51",
        orderId: "635e207d10c248095e78ce50",
      },
    ],
    preferences: [],
    restrictions: [],
    id: "635e207d10c248095e78ce54",
  },
  {
    patientId: "635e207d10c248adfe095e78ce51",
    orders: [
      {
        id: "635e207d10c248095e78ce52",
        breakfast: "s635e207d10c248095e78ce4e",
        lunch: "635e2s07d10c2480d95e7sd8ce4e",
        dinner: "234n4l345n324lng54",
        date: new Date("11-11-01"),
        patientId: "635e207d10c248095e78ce51",
        orderId: "635e207d10c248095e78ce50",
      },
    ],
    preferences: [],
    restrictions: [],
    id: "635e207d10c248095e78ce54",
  },
];

const aday = {
  date: new Date("11-11-01"),
  dayId: "q24j35oi356ouh3o4ih534ll",
  breakfast: [
    {
      entreeId: "s635e207d10c248095e78ce4e",
      name: "eggs",
      foodItems: [
        {
          foodItemId: "asdfasdfasdf",
          name: "egg",
          ingredients: [
            {
              ingredientId: "asasdflientient",
              name: "egg",
            },
          ],
        },
      ],
    },
    {
      entreeId: "234n4l345n8888324ln54",
      name: "bread",
      foodItems: [
        {
          foodItemId: "asdfasdf9asdf",
          name: "bread",
          ingredients: [
            {
              ingredientId: "asasdfli9999entient",
              name: "bread",
            },
          ],
        },
      ],
    },
  ],
  lunch: [
    {
      entreeId: "635e2s07d10c248095e7sd8ce4e",
      name: "sandwich",
      foodItems: [
        {
          foodItemId: "asdfasdfasdf",
          name: "egg",
          ingredients: [
            {
              ingredientId: "asasdflientient",
              name: "egg",
            },
          ],
        },
      ],
    },
    {
      entreeId: "234n4l345n8888324ln54",
      name: "bread",
      foodItems: [
        {
          foodItemId: "asdfasdf9asdf",
          name: "bread",
          ingredients: [
            {
              ingredientId: "asasdfli9999entient",
              name: "bread",
            },
          ],
        },
      ],
    },
  ],
  dinner: [
    {
      entreeId: "234n4l345n324lng54",
      name: "steak and eggs",
      foodItems: [
        {
          foodItemId: "asdfasdfasdf",
          name: "egg",
          ingredients: [
            {
              ingredientId: "asasdflientient",
              name: "egg",
            },
          ],
        },
        {
          foodItemId: "aggsdfasdfasdf",
          name: "steak",
          ingredients: [
            {
              ingredientId: "asasdflggientient",
              name: "beef",
            },
          ],
        },
      ],
    },
    {
      entreeId: "635e2ssd0s7d10c248095e7sd8ce4e",
      name: "bread",
      foodItems: [
        {
          foodItemId: "asdfasdf9asdf",
          name: "bread",
          ingredients: [
            {
              ingredientId: "asasdfli9999entient",
              name: "bread",
            },
          ],
        },
      ],
    },
  ],
};

const aPatient = "635e207d10c248adfe095e78ce51";

const aOrder = {
  id: "635e207d10c248095e78ce52",
  breakfast: "s635e207d10c248095e78ce4e",
  lunch: "635e2s07d10c2480d95e7sd8ce4e",
  dinner: "635e2sesd0s7d10c248095e7sd8ce4e",
  date: new Date("11-11-01"),
  patientId: "635e207d10c248095e78ce51",
  orderId: "635e207d10c248095e78ce50",
};

export const Dashboard = ({ user }) => {
  const [patientsOrders, setPatientsorders] = useState(null);
  const [providerPatients, setProviderPatients] = useState(null);
  const [activePatient, setActivePatient] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);
  const [day, setDay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

  const fetchPatientsOrders = () => {};
  const fetchProviderPatients = () => {};
  const fetchDay = () => {};

  const formatPatients = () => {};

  const initialOrder = () => {};
  const updateOrder = (entreeId) => {};

  return (
    <div>
      <h1>Dashboard</h1>
      <Grid container spacing={4}>
        <Grid item xs={6} mt={2.7}>
          <PatientAccordian patients={patientsOrders} day={day} />
        </Grid>
        <Grid item xs={6}>
          <Paper>
            {activePatient && activeOrder ? (
              <>
                <EntreeCard
                  mealLabel={"Breakfast"}
                  entreeList={day.breakfast}
                  patientEntreeId={activeOrder.breakfast}
                  parentFn={updateOrder}
                />
                <EntreeCard
                  mealLabel={"Lunch"}
                  entreeList={day.lunch}
                  patientEntreeId={activeOrder.lunch}
                  parentFn={updateOrder}
                />
                <EntreeCard
                  mealLabel={"Dinner"}
                  entreeList={day.dinner}
                  patientEntreeId={activeOrder.breakfast}
                  parentFn={updateOrder}
                />
              </>
            ) : (
              <p>Select a patient</p>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
