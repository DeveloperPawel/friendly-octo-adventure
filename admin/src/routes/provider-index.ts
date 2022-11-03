import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Provider } from "../models/provider";

const router = express.Router();

router.get(
  "/api/admin/provider-index",
  adminAuth,
  async (req: Request, res: Response) => {
    const foundProviders = await Provider.find().limit(20);
    res.status(200).send(foundProviders);
  }
);

export { router as providerIndexRouter };
