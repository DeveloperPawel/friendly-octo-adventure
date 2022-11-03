import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Restriction } from "../models/restriction";

const router = express.Router();

router.get(
  "/api/admin/restriction-index",
  adminAuth,
  async (req: Request, res: Response) => {
    const foundRestrictions = await Restriction.find().limit(20);
    res.status(200).send(foundRestrictions);
  }
);

export { router as restrictionIndexRouter };
