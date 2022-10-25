import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "@mimenu/common";
import { validateRequest } from "@mimenu/common";
import { User, UserType } from "../models/user";
import { ProviderCreatedPublisher } from "../events/publishers/provider/provider-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/auth/signup/:id",
  [
    body("email").isEmail().withMessage("email must be a valid email"),
    body("password")
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (req.params.id === null) {
      throw new BadRequestError();
    }
    const adminReferal = await User.findById(req.params.id);

    if (!adminReferal) {
      throw new BadRequestError();
    }

    const newProvider = User.build({
      email,
      password,
      role: UserType.Provider,
    });
    await newProvider.save();

    new ProviderCreatedPublisher(natsWrapper.client).publish({
      id: newProvider.id,
    });

    res.status(201).send(newProvider);
  }
);

export { router as signupProviderRouter };
