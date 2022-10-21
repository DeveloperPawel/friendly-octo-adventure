import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Provider } from "../model/provider";

const router = express.Router();

router.get(
  "/api/patient/providers/:amount",
  adminAuth,
  async (req: Request, res: Response) => {
    const num = parseInt(req.params.amount);
    let providers: Array<{}>;

    if (isNaN(num)) {
      providers = await Provider.find();
    } else {
      providers = await Provider.find().limit(num);
    }

    res.status(200).send(providers);
  }
);

export { router as allProviderRouter };
