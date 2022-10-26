import { render, screen } from "@testing-library/react";
import { ChipCard } from "../../components/chip-card";

test("displays chips with buttons", async () => {
  render(
    <ChipCard
      chipList={[
        {
          preferenceId: "asdflweignirn5",
          name: "dairy",
          userType: "patient",
        },
        {
          preferenceId: "asdflwe4543ignirn5",
          name: "lettuce",
          userType: "provider",
        },
      ]}
    />
  );

  const dairyButton = await screen.getByRole("button", { name: "dairy" });
  expect(dairyButton).toBeEnabled();

  const lettuceButton = await screen.getByRole("button", { name: "lettuce" });
  expect(lettuceButton).toBeDisabled();
});
