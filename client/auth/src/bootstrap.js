import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { CookiesProvider } from "react-cookie";

const mount = (element, { onSignIn }) => {
  ReactDOM.render(<App onSignIn={onSignIn} />, element);
};

const devSigninFn = (user) => {
  console.log("dev user:", JSON.stringify(user));
};

if (process.env.NODE_ENV === "development") {
  const element = document.querySelector("#auth-dev-root");

  if (element) {
    ReactDOM.render(
      <CookiesProvider>
        <App onSignIn={devSigninFn} />
      </CookiesProvider>,
      element
    );
  }
}

export { mount };
