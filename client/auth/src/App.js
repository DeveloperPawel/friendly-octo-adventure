import React from "react";
import { Form } from "./components/Form.js";

export const App = ({ onSignIn }) => {
  console.log("onSignOnExists: ", !!onSignIn);
  return (
    <div>
      <h1>Auth</h1>
      <Form signup={onSignIn} login={onSignIn} type={"signup"} />
    </div>
  );
};
