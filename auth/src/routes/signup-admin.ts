import { UserType } from "../models/user";
import express, { Request, Response } from "express";
import { BadRequestError } from "../../../common/src/errors/bad-request-error";
import { User } from "../models/user";

const router = express.Router();

router.post("/api/auth/admin", async (req: Request, res: Response) => {
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
});

export { router as signupAdminRouter };
