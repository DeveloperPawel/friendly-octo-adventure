import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import CookieSession from "cookie-session";

import { NotFoundError } from "../../common/src/errors/not-found-error";
import { errorHandler } from "../../common/src/middleware/error-handler";
import { activeUser } from "../../common/src/middleware/active-user";

import { addPatientRouter } from "./routes/add-patient";
import { newPatientRouter } from "./routes/new-patient";
import { onePatientRouter } from "./routes/one-patient";
import { oneProviderRouter } from "./routes/one-provider";
import { allPatientRouter } from "./routes/patient-Index";
import { allProviderRouter } from "./routes/provider-index";
import { removePatientRouter } from "./routes/remove-patient";
import { newProviderRouter } from "./routes/new-provider";

const app = express();
app.use(json());
app.use(
  CookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(activeUser);

app.use(newProviderRouter);
app.use(addPatientRouter);
app.use(newPatientRouter);
app.use(onePatientRouter);
app.use(oneProviderRouter);
app.use(allPatientRouter);
app.use(allProviderRouter);
app.use(removePatientRouter);

app.get("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
