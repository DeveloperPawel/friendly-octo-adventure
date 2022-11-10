import { render, screen } from "@testing-library/react";
import { EntreeCard } from "../components/entree-card";
import "@testing-library/jest-dom";

test("displays food options", async () => {
  render(
    <EntreeCard
      mealLabel={"breakfast"}
      patientEntreeId={"234n4l345n324ln54"}
      entreeList={[
        {
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
        {
          entreeId: "234n4l345n8888324ln54",
          name: "toast",
          foodItems: [
            {
              foodItemId: "asdfasdf9asdf",
              name: "bread",
              ingredients: [
                {
                  ingredientId: "asasdfli9999entient",
                  name: "flour",
                },
              ],
            },
          ],
        },
      ]}
    />
  );

  expect(await screen.findByText("breakfast")).toBeInTheDocument();
  expect(await screen.findByText("eggs")).toBeInTheDocument();

  expect(await screen.findByText("toast")).toBeInTheDocument();
  expect(await screen.findByText("bread")).toBeInTheDocument();
  expect(await screen.findByText("flour")).toBeInTheDocument();

  const foodSelectButtons = await screen.queryAllByText("Select");
  expect(foodSelectButtons).toHaveLength(2);
});

test("displays selected food disabled", async () => {
  render(
    <EntreeCard
      mealLabel={"breakfast"}
      patientEntreeId={"234n4l345n324ln54"}
      entreeList={[
        {
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
        {
          entreeId: "234n4l345n8888324ln54",
          name: "toast",
          foodItems: [
            {
              foodItemId: "asdfasdf9asdf",
              name: "bread",
              ingredients: [
                {
                  ingredientId: "asasdfli9999entient",
                  name: "flour",
                },
              ],
            },
          ],
        },
      ]}
    />
  );

  const eqqsButton = await screen.getByRole("button", { name: "eggs" });
  const toastButton = await screen.getByRole("button", { name: "toast" });

  expect(toastButton).toBeEnabled();
  expect(eqqsButton).toBeDisabled();
});
