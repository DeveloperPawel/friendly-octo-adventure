import express, { Request, Response } from "express";
import { User } from "../models/user";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest } from "../../../common/src/middleware/validate-request";
import { BadRequestError } from "../../../common/src/errors/bad-request-error";
import { UserType } from "../models/user";

const router = express.Router();

router.post(
  "/api/auth/signup",
  [
    body("email").isEmail().withMessage("email must be a valid email"),
    body("password")
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log("Creating user");

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError();
    }

    const user = User.build({ email, password, role: UserType.Patient });
    await user.save();

    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "jwt_key"
    );

    req.session = {
      jwt: userJWT,
    };

    // console.log(JSON.stringify(req, null, 2));

    res.status(201).send(user);
  }
);

export { router as signupRouter };
