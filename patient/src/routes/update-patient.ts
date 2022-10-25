import { NotFoundError, providerAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { PatientDischageUpdatedPublisher } from "../events/publihsers/patient/patient-discharge-updated-pulisher";
import { Patient } from "../model/patient";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/patient/update",
  providerAuth,
  async (req: Request, res: Response) => {
    const { discharge, patientId } = req.body;
    const foundPatient = await Patient.findOne({ patientId });

    if (!foundPatient) {
      throw new NotFoundError();
    }

    foundPatient.discharge = new Date(discharge);
    await foundPatient.save();

    new PatientDischageUpdatedPublisher(natsWrapper.client).publish({
      patientId,
      discharge,
    });

    res.status(200).send(foundPatient);
  }
);

export { router as updatePatientRouter };
