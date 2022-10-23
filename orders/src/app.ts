import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import CookieSession from "cookie-session";

import { NotFoundError } from "@mimenu/common";
import { errorHandler } from "@mimenu/common";
import { activeUser } from "@mimenu/common";

import { createOrderRouter } from "./routes/create-order";
import { addPreferenceRouter } from "./routes/add-preference";
import { addRestrictionRouter } from "./routes/add-restriction";
import { getDayIndexRouter } from "./routes/day-index";
import { getOneDayRouter } from "./routes/day";
import { deleteOrderRouter } from "./routes/delete-order";
import { deletePreferenceRouter } from "./routes/delete-preference";
import { deleteRestrictionRouter } from "./routes/delete-restriction";
import { entreeRouter } from "./routes/entree";
import { dateOrderRouter } from "./routes/orders-by-date";
import { patientIndexRouter } from "./routes/patient-index";
import { patientRouter } from "./routes/patient";
import { updateOrderRouter } from "./routes/update-order";
import { foodItemRouter } from "./routes/food-item";
import { restrictionIndexRouter } from "./routes/restriction-index";
import { preferenceIndexRouter } from "./routes/preference-index";

const app = express();
app.use(json());
app.use(
  CookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(activeUser);

app.use(createOrderRouter);
app.use(addPreferenceRouter);
app.use(addRestrictionRouter);
app.use(getOneDayRouter);
app.use(getDayIndexRouter);
app.use(deleteOrderRouter);
app.use(deletePreferenceRouter);
app.use(deleteRestrictionRouter);
app.use(entreeRouter);
app.use(dateOrderRouter);
app.use(patientIndexRouter);
app.use(patientRouter);
app.use(updateOrderRouter);
app.use(foodItemRouter);
app.use(restrictionIndexRouter);
app.use(preferenceIndexRouter);

app.get("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
