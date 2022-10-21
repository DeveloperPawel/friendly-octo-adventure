import { patientAuth } from "@mimenu/common";
import express, { Request, Response } from "express";

const router = express.Router();

router.get(
  "/api/order/entree/:entreeId",
  patientAuth,
  (req: Request, res: Response) => {
    req.session = null;

    res.status(200).send({});
  }
);

export { router as entreeRouter };
