import { providerAuth } from "./../../../common/src/middleware/provider-auth";
import express, { Request, Response } from "express";
import { activeUser } from "../../../common/src/middleware/active-user";

const router = express.Router();

router.post(
  "/api/patient/remove",
  providerAuth,
  (req: Request, res: Response) => {
    // req.session = null;

    res.status(200).send({});
  }
);

export { router as removePatientRouter };