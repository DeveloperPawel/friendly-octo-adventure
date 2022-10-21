import { patientAuth } from "@mimenu/common";
import express, { Request, Response } from "express";

const router = express.Router();

router.post(
  "/api/order/create-order",
  patientAuth,
  (req: Request, res: Response) => {
    req.session = null;

    res.status(200).send({});
  }
);

export { router as createOrderRouter };
