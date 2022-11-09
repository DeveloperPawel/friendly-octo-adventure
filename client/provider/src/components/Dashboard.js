import React from "react";
import { PatientAccordian } from "@mimenu/client-common";
import Grid from "@mui/material/Grid";

export const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <PatientAccordian
            patients={[
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
            ]}
            day={{
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
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <>Hello</>
        </Grid>
      </Grid>
    </div>
  );
};
