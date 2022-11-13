import React from "react";
import { Form } from "./components/Form.js";

export const App = ({ onSignIn }) => {
  console.log("onSignOnExists: ", !!onSignIn);
  return (
    <div>
      <Form signup={onSignIn} login={() => {}} type={"signup"} />
    </div>
  );
};
