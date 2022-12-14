import { providerAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Patient } from "../model/patient";
import { NotFoundError } from "@mimenu/common";
import { Provider } from "../model/provider";
import { PatientProviderUpdatedPublisher } from "../events/publihsers/patient/patient-provider-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/patient/add",
  providerAuth,
  async (req: Request, res: Response) => {
    const { patientId, providerId } = req.body;

    const foundPatient = await Patient.findOne({ id: patientId });

    if (!foundPatient) {
      throw new NotFoundError();
    }

    const foundProvider = await Provider.findOne({ id: providerId });

    if (!foundProvider) {
      throw new NotFoundError();
    }

    foundProvider.patients?.push(foundPatient.id);
    await foundProvider.save();

    foundPatient.providerId = providerId;
    await foundPatient.save();

    new PatientProviderUpdatedPublisher(natsWrapper.client).publish({
      patientId,
      providerId,
    });

    res.status(201).send(foundProvider);
  }
);

export { router as addPatientRouter };
