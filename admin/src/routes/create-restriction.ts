import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Restriction } from "../models/restriction";

const router = express.Router();

router.post(
  "/api/admin/create-restriction",
  adminAuth,
  async (req: Request, res: Response) => {
    const { type } = req.body;
    const restriction = Restriction.build({
      type,
    });
    await restriction.save();
    res.status(201).send(restriction);
  }
);

export { router as createRestrictionRouter };
