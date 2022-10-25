import { providerAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Patient } from "../model/patient";
import { Provider } from "../model/provider";
import { NotFoundError } from "@mimenu/common";
import { natsWrapper } from "../nats-wrapper";
import { PatientProviderUpdatedPublisher } from "../events/publihsers/patient/patient-provider-updated-publisher";

const router = express.Router();

router.post(
  "/api/patient/remove",
  providerAuth,
  async (req: Request, res: Response) => {
    const { providerId, patientId } = req.body;

    const foundPatient = await Patient.findOne({ id: patientId });

    if (!foundPatient) {
      throw new NotFoundError();
    }

    const foundProvider = await Provider.findOne({ id: providerId });

    if (!foundProvider) {
      throw new NotFoundError();
    }

    foundProvider.patients = foundProvider.patients!.filter(function (patient) {
      return patient === patientId;
    });
    await foundProvider.save();

    foundPatient.providerId = undefined;
    await foundPatient.save();

    new PatientProviderUpdatedPublisher(natsWrapper.client).publish({
      patientId,
      providerId: null,
    });

    res.status(202).send(foundProvider);
  }
);

export { router as removePatientRouter };
