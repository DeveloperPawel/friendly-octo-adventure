import { providerAuth } from "./../../../common/src/middleware/provider-auth";
import express, { Request, Response } from "express";
import { Provider } from "../model/provider";
import { NotFoundError } from "../../../common/src/errors/not-found-error";

const router = express.Router();

router.get(
  "/api/patient/provider/:providerId",
  providerAuth,
  async (req: Request, res: Response) => {
    const foundProvider = await Provider.findById(req.params.providerId);

    if (!foundProvider) {
      throw new NotFoundError();
    }

    res.status(200).send(foundProvider);
  }
);

export { router as oneProviderRouter };
