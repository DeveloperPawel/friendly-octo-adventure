import { adminAuth } from "./../../../common/src/middleware/admin-auth";
import express, { Request, Response } from "express";

const router = express.Router();

router.get(
  "/api/patient/providers",
  adminAuth,
  (req: Request, res: Response) => {
    req.session = null;

    res.status(200).send({});
  }
);

export { router as allProviderRouter };
