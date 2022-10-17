import { adminAuth } from "./../../../common/src/middleware/admin-auth";
import express, { Request, Response } from "express";
import { activeUser } from "../../../common/src/middleware/active-user";

const router = express.Router();

router.get(
  "/api/patient/patients/:amount",
  adminAuth,
  (req: Request, res: Response) => {
    req.session = null;

    res.status(200).send({});
  }
);

export { router as allPatientRouter };
