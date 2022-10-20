import express, { Request, Response } from "express";
import { providerAuth } from "../../../common/src/middleware/provider-auth";

const router = express.Router();

router.get(
  "/api/order/restrictions",
  providerAuth,
  (req: Request, res: Response) => {
    req.session = null;

    res.status(200).send({});
  }
);

export { router as restrictionIndexRouter };
