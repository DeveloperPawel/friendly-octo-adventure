import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validate-request";
import { User } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/auth/login",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password must be valid"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new Error("Bad request");
    }

    const matchPassword = await Password.compare(
      existingUser.password,
      password
    );

    if (!matchPassword) {
      throw new Error("Invalid credentials");
    }

    const userJWT = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      "jwt_key"
    );

    req.session = {
      jwt: userJWT,
    };

    res.status(200).send(existingUser);
  }
);

export { router as loginRouter };
