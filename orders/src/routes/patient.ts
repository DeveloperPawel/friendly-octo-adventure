import {
  NotAuthorizedError,
  NotFoundError,
  patientAuth,
  UserType,
} from "@mimenu/common";
import express, { Request, Response } from "express";
import { Patient } from "../models/patient";

const router = express.Router();

router.get(
  "/api/order/patient/:patientId",
  patientAuth,
  async (req: Request, res: Response) => {
    if (
      req.user?.id !== req.params.patientId &&
      req.user?.role == UserType.Patient
    ) {
      throw new NotAuthorizedError();
    }
    const foundPatient = await Patient.findOne({
      patientId: req.params.patientId,
    });

    if (!foundPatient) {
      throw new NotFoundError();
    }

    res.status(200).send(foundPatient);
  }
);

export { router as patientRouter };
