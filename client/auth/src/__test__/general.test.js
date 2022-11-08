import { render, screen } from "@testing-library/react";
import { Form } from "../components/Form";
import UserEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

test("renders login form", async () => {
  render(<Form type="login" />);

  const userNameTextINput = await screen.findAllByRole();
  const passwordTextInput = await screen.findAllByRole();

  const signupButton = await screen.findAllByRole();
  const loginButton = await screen.findAllByRole();

  expect(userNameTextINput).toBeDefined();
  expect(passwordTextInput).toBeDefined();
  expect(signupButton).toBeDefined();
  expect(loginButton).toBeDefined();
});

test("renders signup form", async () => {
  render(<Form type="signup" />);

  const userNameTextINput = await screen.findAllByRole();
  const passwordTextInput = await screen.findAllByRole();

  const signupButton = await screen.findAllByRole();
  const loginButton = await screen.findAllByRole();

  expect(userNameTextINput).toBeDefined();
  expect(passwordTextInput).toBeDefined();
  expect(signupButton).toBeDefined();
  expect(loginButton).toBeDefined();
});

test("login button disabled when username and pass empty", async () => {
  render(<Form type="login" />);

  const userNameTextINput = await screen.findAllByRole();
  const passwordTextInput = await screen.findAllByRole();

  const signupButton = await screen.findAllByRole();
  const loginButton = await screen.findAllByRole();

  expect(userNameTextINput).toBeDefined();
  expect(passwordTextInput).toBeDefined();
  expect(signupButton).toBeDefined();
  expect(loginButton).toBeDefined();

  expect(loginButton).toBeDisabled();

  UserEvent.type(userNameTextInput, "username");
  UserEvent.type(passwordTextInput, "password");

  expect(loginButton).toBeEnabled();
});

test("signup button disabled when the username and password are empty", async () => {
  render(<Form type="signup" />);

  const userNameTextInput = await screen.findAllByRole();
  const passwordTextInput = await screen.findAllByRole();

  const signupButton = await screen.findAllByRole();
  const loginButton = await screen.findAllByRole();

  expect(userNameTextInput).toBeDefined();
  expect(passwordTextInput).toBeDefined();
  expect(signupButton).toBeDefined();
  expect(loginButton).toBeDefined();

  expect(signupButton).toBeDisabled();

  UserEvent.type(userNameTextInput, "username");
  UserEvent.type(passwordTextInput, "password");

  expect(signupButton).toBeEnabled();
});
