import express, { Request, Response } from "express";
import { adminAuth } from "../../../common/src/middleware/admin-auth";

const router = express.Router();

router.post("/api/patient/new", adminAuth, (req: Request, res: Response) => {
  req.session = null;

  res.status(200).send({});
});

export { router as newPatientRouter };
