import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Entree } from "../models/entree";

const router = express.Router();

router.get(
  "/api/admin/entree-index",
  adminAuth,
  async (req: Request, res: Response) => {
    const foundEntrees = await Entree.find().limit(20);
    res.status(200).send(foundEntrees);
  }
);

export { router as entreeIndexRouter };
