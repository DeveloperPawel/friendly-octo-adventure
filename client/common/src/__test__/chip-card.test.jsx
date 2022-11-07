import { render, screen } from "@testing-library/react";
import { ChipCard } from "../../components/chip-card";
import "@testing-library/jest-dom";

test("displays chips with buttons", async () => {
  render(
    <ChipCard
      displayChipList={[
        {
          preferenceId: "asdflweignirn5",
          value: "dairy",
          userType: "patient",
        },
        {
          preferenceId: "asdflwe4543ignirn5",
          value: "lettuce",
          userType: "provider",
        },
      ]}
      parentFn={(string) => {}}
    />
  );

  expect(await screen.findByText("dairy")).toBeInTheDocument();
  expect(await screen.findByText("lettuce")).toBeInTheDocument();

  const dairyButton = await screen.getByRole("button", { name: "dairy" });
  expect(dairyButton).toBeEnabled();

  const lettuceButton = await screen.getByRole("button", { name: "lettuce" });
  expect(lettuceButton).toBeDisabled();
});
