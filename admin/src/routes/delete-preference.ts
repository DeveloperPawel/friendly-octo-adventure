import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Preference } from "../models/preference";

const router = express.Router();

router.post(
  "/api/admin/delete-preference",
  adminAuth,
  async (req: Request, res: Response) => {
    const { preferenceId } = req.body;
    await Preference.deleteOne({ id: preferenceId });
    res.status(202).send({});
  }
);

export { router as deletePreferenceRouter };
