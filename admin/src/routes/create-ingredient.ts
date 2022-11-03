import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Ingredient } from "../models/ingredient";

const router = express.Router();

router.post(
  "/api/admin/create-ingredient",
  adminAuth,
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const ingredient = Ingredient.build({
      name,
    });
    await ingredient.save();
    res.status(200).send(ingredient);
  }
);

export { router as createIngredientRouter };
