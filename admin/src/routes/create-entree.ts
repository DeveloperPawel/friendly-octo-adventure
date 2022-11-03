import { adminAuth, NotFoundError } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Entree } from "../models/entree";
import { FoodItem, FoodItemDoc } from "../models/fooditem";

const router = express.Router();

router.post(
  "/api/admin/create-entree",
  adminAuth,
  async (req: Request, res: Response) => {
    const { name, foodItems } = req.body;
    let foundFoodItems: Array<FoodItemDoc> = [];
    if (foodItems.length > 0) {
      for (const foodItemId of foodItems) {
        const foundFooditem = await FoodItem.findOne({ id: foodItemId });
        if (!foundFooditem) {
          throw new NotFoundError();
        }
        foundFoodItems.push(foundFooditem);
      }
    }

    const entree = Entree.build({
      name,
      foodItems: foundFoodItems,
    });
    await entree.save();
    res.status(201).send(entree);
  }
);

export { router as createEntreeRouter };
