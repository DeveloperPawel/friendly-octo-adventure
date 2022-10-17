import { providerAuth } from "./../../../common/src/middleware/provider-auth";
import express, { Request, Response } from "express";
import { Patient } from "../model/patient";
import { NotFoundError } from "../../../common/src/errors/not-found-error";

const router = express.Router();

router.get(
  "/api/patient/patient/:patientId",
  providerAuth,
  async (req: Request, res: Response) => {
    const foundPatient = await Patient.findById(req.params.patientId);

    if (!foundPatient) {
      throw new NotFoundError();
    }

    res.status(200).send(foundPatient);
  }
);

export { router as onePatientRouter };
