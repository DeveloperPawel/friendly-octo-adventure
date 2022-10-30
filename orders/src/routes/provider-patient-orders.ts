import express, { Request, Response } from "express";
import { providerAuth } from "@mimenu/common";
import { Patient } from "../models/patient";

const router = express.Router();

router.post(
  "/api/order/patient-orders",
  providerAuth,
  async (req: Request, res: Response) => {
    const { patientList } = req.body;

    const foundPatients = await Patient.find({
      patientId: { $in: patientList },
    }).populate({ path: "orders", model: "Order" });

    res.status(200).send(foundPatients);
  }
);

export { router as providerPatientOrders };
