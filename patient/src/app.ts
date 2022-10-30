import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import CookieSession from "cookie-session";

import { NotFoundError } from "@mimenu/common";
import { errorHandler } from "@mimenu/common";
import { activeUser } from "@mimenu/common";

import { addPatientRouter } from "./routes/add-patient";
import { onePatientRouter } from "./routes/one-patient";
import { oneProviderRouter } from "./routes/one-provider";
import { allPatientRouter } from "./routes/patient-Index";
import { allProviderRouter } from "./routes/provider-index";
import { removePatientRouter } from "./routes/remove-patient";
import { updatePatientRouter } from "./routes/update-patient";
import { getProviderPatientsRouter } from "./routes/provider-patient-index";

const app = express();
app.use(json());
app.use(
  CookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(activeUser);

app.use(addPatientRouter);
app.use(onePatientRouter);
app.use(oneProviderRouter);
app.use(allPatientRouter);
app.use(allProviderRouter);
app.use(removePatientRouter);
app.use(updatePatientRouter);
app.use(getProviderPatientsRouter);

app.get("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
