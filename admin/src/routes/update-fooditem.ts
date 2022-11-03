import { adminAuth, NotFoundError } from "@mimenu/common";
import express, { Request, Response } from "express";
import { FoodItem } from "../models/fooditem";
import { Ingredient, IngredientDoc } from "../models/ingredient";

const router = express.Router();

router.post(
  "/api/admin/update-fooditem",
  adminAuth,
  async (req: Request, res: Response) => {
    const { foodItemId, name, ingredients } = req.body;

    const foundFoodItem = await FoodItem.findOne({ id: foodItemId });
    if (!foundFoodItem) {
      throw new NotFoundError();
    }

    if (!foundFoodItem.ingredients) foundFoodItem.ingredients = [];

    let foundIngredients: Array<IngredientDoc> = [];
    for (const ingredientId of ingredients) {
      const foundIngredient = await Ingredient.findOne({ id: ingredientId });
      if (!foundIngredient) {
        throw new NotFoundError();
      }
      foundIngredients.push(foundIngredient);
    }
    foundFoodItem.name = name;
    foundFoodItem.ingredients = foundIngredients;
    await foundFoodItem.save();
    res.status(200).send(foundFoodItem);
  }
);

export { router as updateFoodItemRouter };
