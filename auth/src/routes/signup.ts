import express from "express";
import { User } from "../models/user";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middleware/validate-request";

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
  async (req: Request, res: Response) => {}
);

export { router as signupRouter };
