import { adminAuth, NotFoundError } from "@mimenu/common";
import express, { Request, Response } from "express";
import { FoodItem } from "../models/fooditem";
import { Ingredient, IngredientDoc } from "../models/ingredient";

const router = express.Router();

router.post(
  "/api/admin/create-fooditem",
  adminAuth,
  async (req: Request, res: Response) => {
    const { name, ingredients } = req.body;
    let foundIngredients: Array<IngredientDoc> = [];
    for (const ingredientId of ingredients) {
      const foundIngredient = await Ingredient.findOne({ id: ingredientId });
      if (!foundIngredient) {
        throw new NotFoundError();
      }
      foundIngredients.push(foundIngredient);
    }
    const foodItem = FoodItem.build({ name, ingredients: foundIngredients });
    await foodItem.save();
    res.status(201).send(foodItem);
  }
);

export { router as createFoodItemRouter };
