import express, { Request, Response } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  patientAuth,
  providerAuth,
  UserType,
} from "@mimenu/common";
import { Patient } from "../models/patient";
import { Entree } from "../models/entree";
import { Order } from "../models/order";

const router = express.Router();

router.post(
  "/api/order/patient-orders",
  providerAuth,
  async (req: Request, res: Response) => {
    const { orderList } = req.body;

    res.status(200).send({});
  }
);

export { router as providerPatientOrders };
