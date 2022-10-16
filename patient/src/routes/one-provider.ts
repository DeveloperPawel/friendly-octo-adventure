import { providerAuth } from "./../../../common/src/middleware/provider-auth";
import express, { Request, Response } from "express";

const router = express.Router();

router.get(
  "/api/patient/provider/:providerId",
  providerAuth,
  (req: Request, res: Response) => {
    req.session = null;

    res.status(200).send({});
  }
);

export { router as oneProviderRouter };
