import express, { Request, Response } from "express";
import { patientAuth } from "@mimenu/common";
import { Preference } from "../models/preference";

const router = express.Router();

router.get(
  "/api/order/preferences",
  patientAuth,
  async (req: Request, res: Response) => {
    const preferences = await Preference.find().limit(20);

    res.status(200).send(preferences);
  }
);

export { router as preferenceIndexRouter };
