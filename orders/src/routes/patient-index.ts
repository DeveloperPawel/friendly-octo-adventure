import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/order/patients", adminAuth, (req: Request, res: Response) => {
  req.session = null;

  res.status(200).send({});
});

export { router as patientIndexRouter };
