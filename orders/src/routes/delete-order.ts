import express, { Request, Response } from "express";
import { providerAuth } from "@mimenu/common";

const router = express.Router();

router.post(
  "/api/order/delete-order",
  providerAuth,
  (req: Request, res: Response) => {
    res.status(202).send({});
  }
);

export { router as deleteOrderRouter };
