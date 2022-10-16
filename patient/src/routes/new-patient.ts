import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/patient/new", (req: Request, res: Response) => {
  req.session = null;

  res.status(200).send({});
});

export { router as newPatientRouter };
