import express, { Request, Response } from "express";
import { patientAuth } from "../../../common/src/middleware/patient-auth";

const router = express.Router();

router.get(
  "/api/order/preferences",
  patientAuth,
  (req: Request, res: Response) => {
    req.session = null;

    res.status(200).send({});
  }
);

export { router as preferenceIndexRouter };
