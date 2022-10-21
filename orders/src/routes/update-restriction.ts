import express, { Request, Response } from "express";
import { providerAuth } from "@mimenu/common";

const router = express.Router();

router.post(
  "/api/order/update-restriction",
  providerAuth,
  (req: Request, res: Response) => {
    req.session = null;

    res.status(200).send({});
  }
);

export { router as updateRestrictionRouter };
