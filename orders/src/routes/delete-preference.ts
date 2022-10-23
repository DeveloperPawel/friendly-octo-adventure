import express, { Request, Response } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  patientAuth,
  UserType,
} from "@mimenu/common";
import { Preference } from "../models/preference";
import { Patient } from "../models/patient";

const router = express.Router();

router.post(
  "/api/order/delete-preference",
  patientAuth,
  async (req: Request, res: Response) => {
    const { preferenceId, patientId } = req.body;

    if (req.user?.id !== patientId && req.user?.role == UserType.Patient) {
      throw new NotAuthorizedError();
    }

    const foundPreference = await Preference.findOne({ preferenceId });

    if (!foundPreference) {
      throw new NotFoundError();
    }

    switch (foundPreference.userType) {
      case UserType.Admin:
      case UserType.Provider:
        if (req.user?.role == UserType.Patient) {
          throw new NotAuthorizedError();
        }
        break;

      default:
        break;
    }

    const foundPatient = await Patient.findOne({ patientId });

    if (!foundPatient) {
      throw new NotFoundError();
    }

    foundPatient!.preferences = foundPatient.preferences?.filter(function (
      preference
    ) {
      return preference === preferenceId;
    });
    await foundPatient.save();

    res.status(202).send({});
  }
);

export { router as deletePreferenceRouter };
