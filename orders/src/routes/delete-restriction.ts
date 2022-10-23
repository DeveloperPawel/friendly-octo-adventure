import express, { Request, Response } from "express";
import { NotFoundError, providerAuth } from "@mimenu/common";
import { Patient } from "../models/patient";

const router = express.Router();

router.post(
  "/api/order/delete-restriction",
  providerAuth,
  async (req: Request, res: Response) => {
    const { restrictionId, patientId } = req.body;

    const foundPatient = await Patient.findOne({ patientId });

    if (!foundPatient) {
      throw new NotFoundError();
    }

    foundPatient.restrictions = foundPatient.restrictions?.filter(function (
      restriction
    ) {
      return restriction == restrictionId;
    });
    await foundPatient.save();

    res.status(202).send({});
  }
);

export { router as deleteRestrictionRouter };
