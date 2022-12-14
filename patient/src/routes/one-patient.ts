import { providerAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Patient } from "../model/patient";
import { NotFoundError } from "@mimenu/common";

const router = express.Router();

router.get(
  "/api/patient/patient/:patientId",
  providerAuth,
  async (req: Request, res: Response) => {
    const foundPatient = await Patient.findOne({
      patientId: req.params.patientId,
    });

    if (!foundPatient) {
      throw new NotFoundError();
    }

    res.status(200).send(foundPatient);
  }
);

export { router as onePatientRouter };
