import express, { Request, Response } from "express";
import { activeUser } from "@mimenu/common";

const router = express.Router();

router.post("/api/auth/logout", activeUser, (req: Request, res: Response) => {
  req.session = null;

  res.status(200).send({});
});

export { router as logoutRouter };
