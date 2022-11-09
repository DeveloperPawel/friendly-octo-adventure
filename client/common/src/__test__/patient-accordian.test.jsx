import { getByTestId, render, screen } from "@testing-library/react";
import { PatientAccordian } from "../components/provider-patient-accordian";
import { formatDateAlpha } from "../../functions/date";
import "@testing-library/jest-dom";

const patientData = [
  {
    patientId: "635e207d10c248095e78ce51",
    orders: [
      {
        id: "635e207d10c248095e78ce52",
        breakfast: "635e207d10c248095e78ce4e",
        lunch: "635e207d10c248095e7sd8ce4e",
        dinner: "635e2ssd0s7d10c248095e7sd8ce4e",
        date: new Date(formatDateAlpha(new Date())),
        patientId: "635e207d10c248095e78ce51",
        orderId: "635e207d10c248095e78ce50",
      },
    ],
    preferences: [],
    restrictions: [],
    id: "635e207d10c248095e78ce54",
  },
  {
    patientId: "635e207d10c248095e78ce57",
    orders: [
      {
        id: "635e207d10c248095e78ce58",
        breakfast: "s635e207d10c248095e78ce4e",
        lunch: "635e2s07d10c248095e7sd8ce4e",
        dinner: "635e2ssd0s7d10c248095e7sd8ce4e",
        date: new Date(formatDateAlpha(new Date())),
        patientId: "635e207d10c248095e78ce57",
        orderId: "635e207d10c248095e78ce56",
      },
    ],
    preferences: [],
    restrictions: [],
    id: "635e207d10c248095e78ce5a",
  },
  {
    patientId: "635e207d10c248095e78ce5d",
    orders: [
      {
        id: "635e207d10c248095e78ce5e",
        breakfast: "s635e207d10c248095e78ce4e",
        lunch: "635e2s07d10c248095e7sd8ce4e",
        dinner: "635e2ssd0s7d10c248095e7sd8ce4e",
        date: new Date(formatDateAlpha(new Date())),
        patientId: "635e207d10c248095e78ce5d",
        orderId: "635e207d10c248095e78ce5c",
      },
    ],
    preferences: [],
    restrictions: [],
    id: "635e207d10c248095e78ce60",
  },
  {
    patientId: "635e207d10c248095e78ce63",
    orders: [
      {
        id: "635e207d10c248095e78ce64",
        breakfast: "s635e207d10c248095e78ce4e",
        lunch: "635e2s07d10c248095e7sd8ce4e",
        dinner: "635e2ssd0s7d10c248095e7sd8ce4e",
        date: new Date(formatDateAlpha(new Date())),
        patientId: "635e207d10c248095e78ce63",
        orderId: "635e207d10c248095e78ce62",
      },
    ],
    preferences: [],
    restrictions: [],
    id: "635e207d10c248095e78ce66",
  },
];

const dayData = {
  date: new Date(formatDateAlpha(new Date())),
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

test("renders all of the patients", async () => {
  render(<PatientAccordian patients={patientData} day={dayData} />);

  expect(await screen.findByText("patient 4")).toBeInTheDocument();
});

xtest("[does not work with materialui] title indicates the status of the patients orders", async () => {
  const { container } = render(
    <PatientAccordian patients={patientData} day={dayData} />
  );

  const buttontextPatientBreakfast = await screen.findAllByText("Breakfast");
  const buttontextPatientLunch = await screen.findAllByText("Lunch");
  const buttontextPatientDinner = await screen.findAllByText("Dinner");

  expect(buttontextPatientBreakfast[0]).toHaveStyle("color: red");
  expect(buttontextPatientLunch[0]).toHaveStyle("color: red");
  expect(buttontextPatientDinner[0]).toHaveStyle("color: green");

  expect(buttontextPatientBreakfast[1]).toHaveStyle("color: green");
  expect(buttontextPatientLunch[1]).toHaveStyle("color: green");
  expect(buttontextPatientDinner[1]).toHaveStyle("color: green");
});
