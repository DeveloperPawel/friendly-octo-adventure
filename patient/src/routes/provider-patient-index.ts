import { NotFoundError, providerAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { PatientDischageUpdatedPublisher } from "../events/publihsers/patient/patient-discharge-updated-pulisher";
import { Patient } from "../model/patient";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.get(
  "/api/patient/patient-index",
  providerAuth,
  async (req: Request, res: Response) => {
    const foundPatients = await Patient.find({ providerId: req.user!.id });

    res.status(200).send(foundPatients);
  }
);

export { router as getProviderPatientsRouter };
