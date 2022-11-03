import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Patient } from "../models/patient";

const router = express.Router();

router.get(
  "/api/admin/patient-index",
  adminAuth,
  async (req: Request, res: Response) => {
    const foundPatients = await Patient.find().limit(20);
    res.status(200).send(foundPatients);
  }
);

export { router as patientIndexRouter };
