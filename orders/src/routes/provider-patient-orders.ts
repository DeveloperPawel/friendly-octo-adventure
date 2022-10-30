import express, { Request, Response } from "express";
import { providerAuth } from "@mimenu/common";
import { Order } from "../models/order";

const router = express.Router();

router.post(
  "/api/order/patient-orders",
  providerAuth,
  async (req: Request, res: Response) => {
    const { patientList } = req.body;

    const foundOrders = await Order.find({
      patientId: { $in: patientList },
    }).sort({
      date: -1,
    });

    res.status(200).send(foundOrders);
  }
);

export { router as providerPatientOrders };
