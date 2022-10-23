import express, { Request, Response } from "express";
import { NotFoundError, providerAuth } from "@mimenu/common";
import { Restriction } from "../models/restriction";
import { Patient } from "../models/patient";

const router = express.Router();

router.post(
  "/api/order/add-restriction",
  providerAuth,
  async (req: Request, res: Response) => {
    const { restrctionId, patientId } = req.body;

    const foundRestriction = await Restriction.findOne({ restrctionId });

    if (!foundRestriction) {
      throw new NotFoundError();
    }

    const foundPatient = await Patient.findOne({ patientId });

    if (!foundPatient) {
      throw new NotFoundError();
    }

    foundPatient.restrictions?.push(foundRestriction);
    await foundPatient.save();

    res.status(200).send({});
  }
);

export { router as addRestrictionRouter };
