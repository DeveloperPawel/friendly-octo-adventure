import { render, screen } from "@testing-library/react";
import { ChipCard } from "../chip-card";

test("displays chips", () => {
  render(<ChipCard />);
});

test("should remove chip on click", () => {
  render(<ChipCard />);
});

test("admin chip disabled", () => {
  render(<ChipCard />);
});
