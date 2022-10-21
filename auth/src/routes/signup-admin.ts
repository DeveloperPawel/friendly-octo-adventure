import { UserType } from "../models/user";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "@mimenu/common";
import { User } from "../models/user";
import { validateRequest } from "@mimenu/common";

const router = express.Router();

router.post(
  "/api/auth/admin",
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

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError();
    }

    const adminExists = await User.findOne({ email });

    console.log(adminExists);

    if (adminExists) {
      throw new BadRequestError();
    }

    const newAdmin = User.build({ email, password, role: UserType.Admin });
    await newAdmin.save();

    res.status(201).send(newAdmin);
  }
);

export { router as signupAdminRouter };
