import { adminAuth, NotFoundError } from "@mimenu/common";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Entree } from "../models/entree";
import { FoodItem } from "../models/fooditem";

const router = express.Router();

router.post(
  "/api/admin/update-entree",
  adminAuth,
  async (req: Request, res: Response) => {
    const { entreeId, name, foodItems } = req.body;
    const foundEntree = await Entree.findOne({ id: entreeId });
    if (!foundEntree) {
      throw new NotFoundError();
    }

    foundEntree.foodItems = [];

    for (const foodItemId of foodItems) {
      const foundFoodItem = await FoodItem.findOne({ id: foodItemId });
      if (!foundFoodItem) {
        throw new NotFoundError();
      }
      foundEntree.foodItems.push(foundFoodItem);
    }

    foundEntree.name = name;

    await foundEntree.save();
    res.status(200).send(foundEntree);
  }
);

export { router as updateEntreeRouter };
