import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Entree } from "../models/entree";

const router = express.Router();

router.post(
  "/api/admin/delete-entree",
  adminAuth,
  async (req: Request, res: Response) => {
    const { entreeId } = req.body;
    await Entree.deleteOne({ id: entreeId });
    res.status(202).send({});
  }
);

export { router as deleteEntreeRouter };
