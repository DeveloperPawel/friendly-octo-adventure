import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import CookieSession from "cookie-session";

import { NotFoundError } from "@mimenu/common";
import { errorHandler } from "@mimenu/common";
import { activeUser } from "@mimenu/common";

import { createDayRouter } from "./routes/create-day";
import { createEntreeRouter } from "./routes/create-entree";
import { createFoodItemRouter } from "./routes/create-fooditem";
import { createIngredientRouter } from "./routes/create-ingredient";
import { createPreferenceRouter } from "./routes/create-preference";
import { createRestrictionRouter } from "./routes/create-restriction";
import { dayIndexRouter } from "./routes/day-index";
import { deleteDayRouter } from "./routes/delete-day";
import { deleteEntreeRouter } from "./routes/delete-entree";
import { deleteFoodItemRouter } from "./routes/delete-fooditem";
import { deleteIngredientRouter } from "./routes/delete-ingredient";
import { deletePreferenceRouter } from "./routes/delete-preference";
import { deleteRestrictionRouter } from "./routes/delete-restriction";
import { entreeIndexRouter } from "./routes/entree-index";
import { foodItemIndexRouter } from "./routes/foodItem-index";
import { ingredientIndexRouter } from "./routes/ingredient-index";
import { orderIndexRouter } from "./routes/order-index";
import { patientIndexRouter } from "./routes/patient-index";
import { preferenceIndexRouter } from "./routes/preference-index";
import { providerIndexRouter } from "./routes/provider-index";
import { restrictionIndexRouter } from "./routes/restriction-index";
import { updateDayRouter } from "./routes/update-day";
import { updateEntreeRouter } from "./routes/update-entree";
import { updateFoodItemRouter } from "./routes/update-fooditem";
import { updateIngredientRouter } from "./routes/update-ingredient";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  CookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(activeUser);

app.use(createDayRouter);
app.use(createEntreeRouter);
app.use(createFoodItemRouter);
app.use(createIngredientRouter);
app.use(createPreferenceRouter);
app.use(createRestrictionRouter);
app.use(dayIndexRouter);
app.use(deleteDayRouter);
app.use(deleteEntreeRouter);
app.use(deleteFoodItemRouter);
app.use(deleteIngredientRouter);
app.use(deletePreferenceRouter);
app.use(deleteRestrictionRouter);
app.use(entreeIndexRouter);
app.use(foodItemIndexRouter);
app.use(ingredientIndexRouter);
app.use(orderIndexRouter);
app.use(patientIndexRouter);
app.use(preferenceIndexRouter);
app.use(providerIndexRouter);
app.use(restrictionIndexRouter);
app.use(updateDayRouter);
app.use(updateEntreeRouter);
app.use(updateFoodItemRouter);
app.use(updateIngredientRouter);

app.get("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
