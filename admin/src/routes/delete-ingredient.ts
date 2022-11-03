import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Ingredient } from "../models/ingredient";

const router = express.Router();

router.post(
  "/api/admin/delete-ingredient",
  adminAuth,
  async (req: Request, res: Response) => {
    const { ingredientId } = req.body;
    await Ingredient.deleteOne({ id: ingredientId });
    res.status(202).send({});
  }
);

export { router as deleteIngredientRouter };
