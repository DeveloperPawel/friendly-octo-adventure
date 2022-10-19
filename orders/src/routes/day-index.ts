import { patientAuth } from "./../../../common/src/middleware/patient-auth";
import express, { Request, Response } from "express";

const router = express.Router();

router.get(
  "/api/order/day-index",
  patientAuth,
  (req: Request, res: Response) => {
    req.session = null;

    res.status(200).send({});
  }
);

export { router as getDayIndexRouter };
