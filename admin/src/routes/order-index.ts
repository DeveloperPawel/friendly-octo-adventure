import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.get(
  "/api/admin/order-index",
  adminAuth,
  async (req: Request, res: Response) => {
    const foundOrders = await Order.find().sort({ date: -1 }).limit(20);
    res.status(200).send(foundOrders);
  }
);

export { router as orderIndexRouter };
