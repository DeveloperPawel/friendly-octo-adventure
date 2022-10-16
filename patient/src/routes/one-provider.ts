import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api/patient/:providerId", (req: Request, res: Response) => {
  req.session = null;

  res.status(200).send({});
});

export { router as oneProviderRouter };
