import {
  NotAuthorizedError,
  NotFoundError,
  patientAuth,
  UserType,
} from "@mimenu/common";
import express, { Request, Response } from "express";
import { Entree } from "../models/entree";
import { Order } from "../models/order";
import { Patient } from "../models/patient";

const router = express.Router();

router.post(
  "/api/order/create-order",
  patientAuth,
  async (req: Request, res: Response) => {
    const { entreeId, date, patientId } = req.body;

    if (req.user?.id !== patientId && req.user?.role == UserType.Patient) {
      throw new NotAuthorizedError();
    }

    const foundEntree = await Entree.findOne({ entreeId });

    if (!foundEntree) {
      throw new NotFoundError();
    }

    const foundPatient = await Patient.findOne({ patientId });

    if (!foundPatient) {
      throw new NotFoundError();
    }

    const order = Order.build({
      entree: foundEntree,
      patientId,
      date: new Date(date),
    });
    await order.save();

    foundPatient.orders!.push(order);
    await foundPatient.save();

    res.status(201).send(order);
  }
);

export { router as createOrderRouter };
