import express, { Request, Response } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  patientAuth,
  UserType,
} from "@mimenu/common";
import { Patient } from "../models/patient";
import { Entree } from "../models/entree";
import { Order } from "../models/order";

const router = express.Router();

router.post(
  "/api/order/patient/order",
  patientAuth,
  async (req: Request, res: Response) => {
    const { patientId, entreeId, orderId } = req.body;

    if (req.user?.id !== patientId && req.user?.role === UserType.Patient) {
      throw new NotAuthorizedError();
    }

    const foundPatient = await Patient.findOne({ patientId });

    if (!foundPatient) {
      throw new NotFoundError();
    }

    const foundEntree = await Entree.findOne({ entreeId });

    if (!foundEntree) {
      throw new NotFoundError();
    }

    const foundOrder = await Order.findOne({ orderId });

    if (!foundOrder) {
      throw new NotFoundError();
    }

    foundOrder.entree = foundEntree;
    await foundOrder.save();

    res.status(200).send(foundOrder);
  }
);

export { router as updateOrderRouter };
