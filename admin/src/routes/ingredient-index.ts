import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Ingredient } from "../models/ingredient";

const router = express.Router();

router.get(
  "/api/admin/ingredient-index",
  adminAuth,
  async (req: Request, res: Response) => {
    const foundIngredients = await Ingredient.find().limit(20);
    res.status(200).send(foundIngredients);
  }
);

export { router as ingredientIndexRouter };
