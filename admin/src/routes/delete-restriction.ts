import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Restriction } from "../models/restriction";

const router = express.Router();

router.post(
  "/api/admin/delete-restriction",
  adminAuth,
  async (req: Request, res: Response) => {
    const { restrictionId } = req.body;
    await Restriction.deleteOne({ id: restrictionId });
    res.status(202).send({});
  }
);

export { router as deleteRestrictionRouter };
