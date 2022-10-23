import express, { Request, Response } from "express";
import { adminAuth, NotFoundError } from "@mimenu/common";
import { Order } from "../models/order";

const router = express.Router();

router.get(
  "/api/order/patient/orders/:date",
  adminAuth,
  async (req: Request, res: Response) => {
    const foundOrders = await Order.find({ date: new Date(req.params.date) });

    if (!foundOrders) {
      throw new Error("could not find orders");
    }

    res.status(200).send(foundOrders);
  }
);

export { router as dateOrderRouter };
