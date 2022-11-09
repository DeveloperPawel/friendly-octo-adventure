import { render, screen, waitFor } from "@testing-library/react";
import { OrderCard } from "../components/order-card";
import UserEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const dayData = {
  date: new Date(),
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

const patientOrder = {
  id: "635e207d10c248095e78ce52",
  breakfast: "635e207d10c248095e78ce4e",
  lunch: "635e2s07d10c248095e7sd8ce4e",
  dinner: "234n4l345n324lng54",
  date: new Date(),
  patientId: "635e207d10c248095e78ce51",
  orderId: "635e207d10c248095e78ce50",
};

const parentFn = jest.fn();

test("displays the current order", async () => {
  render(<OrderCard patientOrder={patientOrder} day={dayData} />);

  // expect(await screen.findByText("egg")).toBeInTheDocument();
  expect(await screen.findByText("sandwich")).toBeInTheDocument();
  expect(await screen.findByText("steak")).toBeInTheDocument();
  expect(await screen.findByText("beef")).toBeInTheDocument();

  const removebuttons = await screen.queryAllByText("Remove");
  expect(removebuttons).toHaveLength(2);
});

test("function should be called", async () => {
  render(
    <OrderCard patientOrder={patientOrder} day={dayData} parentFn={parentFn} />
  );

  const removebuttons = await screen.queryAllByText("Remove");

  await waitFor(async () => {
    await UserEvent.click(removebuttons[0]);
  });

  expect(parentFn).toHaveBeenCalled();
});
