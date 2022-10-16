import express, { Request, Response } from "express";
import { BadRequestError } from "../../../common/src/errors/bad-request-error";
import { User, UserType } from "../models/user";

const router = express.Router();

router.post("/api/auth/signup/:id", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (req.params.id === null) {
    throw new BadRequestError();
  }
  const adminExists = await User.findById(req.params.id);

  if (!adminExists) {
    throw new BadRequestError();
  }

  const newProvider = User.build({ email, password, role: UserType.Provider });
  await newProvider.save();

  res.status(201).send(newProvider);
});

export { router as signupProviderRouter };
