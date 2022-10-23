import { NotFoundError, patientAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Day } from "../models/day";

const router = express.Router();

router.get(
  "/api/order/day-index",
  patientAuth,
  async (req: Request, res: Response) => {
    const foundDays = await Day.find().sort({ date: -1 }).limit(5);
    if (!foundDays) {
      throw new NotFoundError();
    }
    res.status(200).send(foundDays);
  }
);

export { router as getDayIndexRouter };
