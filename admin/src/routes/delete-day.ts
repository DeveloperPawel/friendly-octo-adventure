import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Day } from "../models/day";

const router = express.Router();

router.post(
  "/api/admin/delete-day",
  adminAuth,
  async (req: Request, res: Response) => {
    const { dayId } = req.body;
    await Day.deleteOne({ id: dayId });
    res.status(202).send({});
  }
);

export { router as deleteDayRouter };
