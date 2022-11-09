import { render, screen, waitFor } from "@testing-library/react";
import { Form } from "../components/Form";
import UserEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const loginFn = jest.fn();
const signUpFn = jest.fn();

test("renders login form", async () => {
  render(<Form type="login" login={() => {}} signup={() => {}} />);

  const userNameTextInput = await screen.findByRole("textbox", {
    name: "username",
  });
  const passwordTextInput = await screen.getByLabelText(/password/i);

  const signupButton = await screen.findByRole("button", { name: "SignUp" });
  const loginButton = await screen.findByRole("button", { name: "Login" });

  expect(userNameTextInput).toBeDefined();
  expect(passwordTextInput).toBeDefined();
  expect(signupButton).toBeDefined();
  expect(loginButton).toBeDefined();
});

test("renders signup form", async () => {
  render(<Form type="signup" />);

  const userNameTextInput = await screen.findByRole("textbox", {
    name: "username",
  });
  const passwordTextInput = await screen.getByLabelText(/password/i);

  const signupButton = await screen.findByRole("button", { name: "SignUp" });
  const loginButton = await screen.findByRole("button", { name: "Login" });

  expect(userNameTextInput).toBeDefined();
  expect(passwordTextInput).toBeDefined();
  expect(signupButton).toBeDefined();
  expect(loginButton).toBeDefined();
});

test("login button disabled when username and pass empty", async () => {
  render(<Form type="login" />);

  const userNameTextInput = await screen.findByRole("textbox", {
    name: "username",
  });
  const passwordTextInput = await screen.getByLabelText(/password/i);

  const signupButton = await screen.findByRole("button", { name: "SignUp" });
  const loginButton = await screen.findByRole("button", { name: "Login" });

  expect(userNameTextInput).toBeDefined();
  expect(passwordTextInput).toBeDefined();
  expect(signupButton).toBeDefined();
  expect(loginButton).toBeDefined();

  expect(loginButton).toBeDisabled();

  await waitFor(async () => {
    await UserEvent.type(userNameTextInput, "password");
    await UserEvent.type(passwordTextInput, "password");
  });

  expect(loginButton).toBeEnabled();
});

test("login button calls login function when called", async () => {
  render(<Form type="login" login={loginFn} />);

  const userNameTextInput = await screen.findByRole("textbox", {
    name: "username",
  });
  const passwordTextInput = await screen.getByLabelText(/password/i);

  const signupButton = await screen.findByRole("button", { name: "SignUp" });
  const loginButton = await screen.findByRole("button", { name: "Login" });

  expect(userNameTextInput).toBeDefined();
  expect(passwordTextInput).toBeDefined();
  expect(signupButton).toBeDefined();
  expect(loginButton).toBeDefined();

  expect(loginButton).toBeDisabled();

  await waitFor(async () => {
    await UserEvent.type(userNameTextInput, "password");
    await UserEvent.type(passwordTextInput, "password");
  });

  expect(loginButton).toBeEnabled();

  await waitFor(async () => {
    await UserEvent.click(loginButton);
  });

  expect(loginFn).toHaveBeenCalled();
});

test("signup button calls signup function when called", async () => {
  render(<Form type="signup" login={loginFn} signup={signUpFn} />);

  const userNameTextInput = await screen.findByRole("textbox", {
    name: "username",
  });
  const passwordTextInput = await screen.getByLabelText(/password/i);

  const signupButton = await screen.findByRole("button", { name: "SignUp" });
  const loginButton = await screen.findByRole("button", { name: "Login" });

  expect(userNameTextInput).toBeDefined();
  expect(passwordTextInput).toBeDefined();
  expect(signupButton).toBeDefined();
  expect(loginButton).toBeDefined();

  expect(signupButton).toBeDisabled();

  await waitFor(async () => {
    await UserEvent.type(userNameTextInput, "password");
    await UserEvent.type(passwordTextInput, "password");
  });

  expect(signupButton).toBeEnabled();

  await waitFor(async () => {
    await UserEvent.click(signupButton);
  });

  expect(signUpFn).toHaveBeenCalled();
});

test("signup button disabled when the username and password are empty", async () => {
  render(<Form type="signup" />);

  const userNameTextInput = await screen.findByRole("textbox", {
    name: "username",
  });
  const passwordTextInput = await screen.getByLabelText(/password/i);

  const signupButton = await screen.findByRole("button", { name: "SignUp" });
  const loginButton = await screen.findByRole("button", { name: "Login" });

  expect(userNameTextInput).toBeDefined();
  expect(passwordTextInput).toBeDefined();
  expect(signupButton).toBeDefined();
  expect(loginButton).toBeDefined();

  expect(signupButton).toBeDisabled();

  await waitFor(async () => {
    await UserEvent.type(userNameTextInput, "password");
    await UserEvent.type(passwordTextInput, "password");
  });

  expect(signupButton).toBeEnabled();
});

test("selector appears and disappears between signup and login", async () => {
  const { container } = render(<Form type="signup" />);

  const selector = container.querySelector("select");
  const loginButton = await screen.findByRole("button", { name: "Login" });

  expect(selector).toBeDefined();

  await waitFor(async () => {
    await UserEvent.click(loginButton);
  });

  expect(selector).toBe(null);
});

test("toggles the form", async () => {
  const { container } = render(<Form type="login" />);

  const formText = container.querySelector("h2");

  const userNameTextInput = await screen.findByRole("textbox", {
    name: "username",
  });
  const passwordTextInput = await screen.getByLabelText(/password/i);

  const signupButton = await screen.findByRole("button", { name: "SignUp" });
  const loginButton = await screen.findByRole("button", { name: "Login" });

  expect(formText).toBeDefined();
  expect(userNameTextInput).toBeDefined();
  expect(passwordTextInput).toBeDefined();
  expect(signupButton).toBeDefined();
  expect(loginButton).toBeDefined();

  expect(formText.innerHTML).toBe("Login");

  expect(signupButton.textContent).toBe("SignUp");
  expect(loginButton.textContent).toBe("Login");

  await waitFor(async () => {
    await UserEvent.click(signupButton);
  });

  expect(signupButton.textContent).toBe("Login");
  expect(loginButton.textContent).toBe("SignUp");

  expect(formText.innerHTML).toBe("SignUp");
});
