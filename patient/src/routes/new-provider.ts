import { providerAuth } from "./../../../common/src/middleware/provider-auth";
import express, { Request, Response } from "express";
import { Provider } from "../model/provider";

const router = express.Router();

router.post(
  "/api/patient/provider/new",
  providerAuth,
  async (req: Request, res: Response) => {
    const { providerId } = req.body;

    const provider = await Provider.build({
      providerId,
    });
    await provider.save();

    res.status(201).send(provider);
  }
);

export { router as newProviderRouter };
