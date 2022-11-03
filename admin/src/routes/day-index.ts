import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Day } from "../models/day";

const router = express.Router();

router.get(
  "/api/admin/day-index",
  adminAuth,
  async (req: Request, res: Response) => {
    const foundDays = await Day.find().limit(20);
    res.status(200).send(foundDays);
  }
);

export { router as dayIndexRouter };
