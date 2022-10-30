import express, { Request, Response } from "express";
import { providerAuth } from "@mimenu/common";
import { Order } from "../models/order";

const router = express.Router();

router.get(
  "/api/order/patient-orders",
  providerAuth,
  async (req: Request, res: Response) => {
    const { patientList } = req.body;

    res.status(200).send({});
  }
);

export { router as providerPatientOrders };
