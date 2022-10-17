import { providerAuth } from "./../../../common/src/middleware/provider-auth";
import express, { Request, Response } from "express";
import { Patient } from "../model/patient";
import { NotFoundError } from "../../../common/src/errors/not-found-error";
import { Provider } from "../model/provider";

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

    foundPatient.providerId = foundProvider.id;
    await foundPatient.save();

    res.status(201).send(foundProvider);
  }
);

export { router as addPatientRouter };
