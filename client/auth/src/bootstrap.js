import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { CookiesProvider } from "react-cookie";

const mount = (element) => {
  ReactDOM.render(<App />, element);
};

if (process.env.NODE_ENV === "development") {
  const element = document.querySelector("#auth-dev-root");

  if (element) {
    ReactDOM.render(
      <CookiesProvider>
        <App />
      </CookiesProvider>,
      element
    );
  }
}

export { mount };
