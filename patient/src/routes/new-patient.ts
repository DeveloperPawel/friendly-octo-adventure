import express, { Request, Response } from "express";
import { providerAuth } from "../../../common/src/middleware/provider-auth";
import { Patient } from "../model/patient";

const router = express.Router();

router.post(
  "/api/patient/new",
  providerAuth,
  async (req: Request, res: Response) => {
    const { discharge, patientId } = req.body;

    const patient = Patient.build({
      patientId,
      discharge,
    });
    await patient.save();

    res.status(201).send(patient);
  }
);

export { router as newPatientRouter };
