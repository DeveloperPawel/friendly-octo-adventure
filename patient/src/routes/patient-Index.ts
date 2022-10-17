import { adminAuth } from "./../../../common/src/middleware/admin-auth";
import express, { Request, Response } from "express";
import { Patient } from "../model/patient";

const router = express.Router();

router.get(
  "/api/patient/patients/:amount",
  adminAuth,
  async (req: Request, res: Response) => {
    const num = parseInt(req.params.amount);
    let patients: Array<{}>;

    if (isNaN(num)) {
      patients = await Patient.find();
    } else {
      patients = await Patient.find().limit(num);
    }

    res.status(200).send(patients);
  }
);

export { router as allPatientRouter };
