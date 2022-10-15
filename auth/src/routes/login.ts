import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validate-request";

const router = express.Router();

router.post(
  "/api/auth/login",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password must be valid"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    res.status(200).send({});
  }
);

export { router as loginRouter };
