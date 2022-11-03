import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Preference } from "../models/preference";

const router = express.Router();

router.get(
  "/api/admin/preference-index",
  adminAuth,
  async (req: Request, res: Response) => {
    const foundPreferences = await Preference.find().limit(20);
    res.status(200).send(foundPreferences);
  }
);

export { router as preferenceIndexRouter };
