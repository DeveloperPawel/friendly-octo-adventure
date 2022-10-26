import { render, screen } from "@testing-library/react";
import { OrderCard } from "../order-card";

test("displays the current order", async () => {
  render(
    <OrderCard
      order={{
        breakfast: {
          entreeId: "234n4l345n324ln54",
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
        lunch: {
          entreeId: "234uuuun4l345n324ln54",
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
        dinner: {
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
        patinetId: "234n4l345n324ln54",
        orderId: "asdflasdkfnurngjd",
        date: new Date(),
      }}
    />
  );

  const removebuttons = await screen.queryAllByText("remove");
  expect(removebuttons).tohavelength(3);
});
