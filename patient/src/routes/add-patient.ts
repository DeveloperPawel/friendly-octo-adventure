import { providerAuth } from "./../../../common/src/middleware/provider-auth";
import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/patient/add", providerAuth, (req: Request, res: Response) => {
  const { patientId, providerId } = req.body;
  console.log("add patient");
  res.status(201).send({});
});

export { router as addPatientRouter };
