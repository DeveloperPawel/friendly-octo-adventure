import express, { Request, Response } from "express";
import { providerAuth } from "@mimenu/common";
import { Restriction } from "../models/restriction";

const router = express.Router();

router.get(
  "/api/order/restrictions",
  providerAuth,
  async (req: Request, res: Response) => {
    const restrictions = await Restriction.find().limit(20);

    res.status(200).send(restrictions);
  }
);

export { router as restrictionIndexRouter };
