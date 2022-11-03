import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Preference } from "../models/preference";

const router = express.Router();

router.post(
  "/api/admin/create-preference",
  adminAuth,
  async (req: Request, res: Response) => {
    const { value } = req.body;
    const preference = Preference.build({ value });
    await preference.save();
    res.status(201).send(preference);
  }
);

export { router as createPreferenceRouter };
