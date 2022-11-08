import React, { useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

export const Form = ({ type, login, signup }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [formState, setFormState] = useState(type);

  const toggleForm = () => {
    if (formState === "login") {
      setFormState("signup");
    } else {
      setFormState("login");
    }
  };

  const FormOutput = (type) => {
    return (
      <Paper>
        {formState === "login" ? <h2>Login</h2> : <h2>SignUp</h2>}

        <TextField
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          label={"username"}
        />

        <TextField
          onChange={(e) => setPassword(e.target.value)}
          formState="password"
          value={password}
          label={"password"}
        />

        <Button variant="text" onClick={toggleForm}>
          {formState === "login" ? "SignUp" : "Login"}
        </Button>
        <Button
          disabled={!(!!userName.length && !!password.length)}
          variant="outlined"
          onClick={formState === "login" ? login : signup}
        >
          {formState === "login" ? "Login" : "SignUp"}
        </Button>
      </Paper>
    );
  };

  return FormOutput(type);
};
