import React from "react";
import { Form } from "./components/Form.js";

export const App = ({ onSignIn }) => {
  return (
    <div>
      <Form signup={onSignIn} login={onSignIn} type={"signup"} />
    </div>
  );
};
