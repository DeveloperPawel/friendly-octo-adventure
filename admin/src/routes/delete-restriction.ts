import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api/admin", adminAuth, async (req: Request, res: Response) => {
  res.status(200).send({});
});

export { router as deleteRestrictionRouter };
