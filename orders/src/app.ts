import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import CookieSession from "cookie-session";

import { NotFoundError } from "../../common/src/errors/not-found-error";
import { errorHandler } from "../../common/src/middleware/error-handler";
import { activeUser } from "./../../common/src/middleware/active-user";

import { createOrderRouter } from "./routes/create-order";
import { createPreferenceRouter } from "./routes/create-preference";
import { createRestrictionRouter } from "./routes/create-restriction";
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
import { updatePreferenceRouter } from "./routes/update-preference";
import { updateRestrictionRouter } from "./routes/update-restriction";
import { foodItemRouter } from "./routes/food-item";

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
app.use(createPreferenceRouter);
app.use(createRestrictionRouter);
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
app.use(updatePreferenceRouter);
app.use(updateRestrictionRouter);
app.use(foodItemRouter);

app.get("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
