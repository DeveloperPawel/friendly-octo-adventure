import React, { useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const Form = ({ type, login, signup }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [signUpType, setSignUpType] = useState("patient");
  const [formState, setFormState] = useState(type);

  const handleSelectChange = (e) => {
    setSignUpType(e.target.value);
  };

  const toggleForm = () => {
    if (formState === "login") {
      setFormState("signup");
    } else {
      setFormState("login");
    }
  };

  const FormOutput = (type) => {
    return (
      <Box m={45} pt={15}>
        <Paper>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
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
            <br />
            {formState !== "login" && (
              <Select
                id="user-signup-type"
                value={signUpType}
                label="Type"
                onChange={handleSelectChange}
              >
                <MenuItem value={"patient"}>Patient</MenuItem>
                <MenuItem value={"provider"}>Provider</MenuItem>
                <MenuItem value={"admin"}>Admin</MenuItem>
              </Select>
            )}
            <br />
            <Stack spacing={2} direction="row">
              <Button variant="text" onClick={toggleForm}>
                {formState === "login" ? "SignUp" : "Login"}
              </Button>
              <Button
                disabled={!(!!userName.length && !!password.length)}
                variant="outlined"
                onClick={
                  formState === "login"
                    ? () => login({ username: userName, password })
                    : () =>
                        signup({
                          username: userName,
                          password,
                          type: signUpType,
                        })
                }
              >
                {formState === "login" ? "Login" : "SignUp"}
              </Button>
            </Stack>
            <br />
          </Grid>
        </Paper>
      </Box>
    );
  };

  return FormOutput(type);
};
