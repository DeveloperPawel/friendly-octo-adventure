import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { FoodItem } from "../models/fooditem";

const router = express.Router();

router.get(
  "/api/admin/fooditem-index",
  adminAuth,
  async (req: Request, res: Response) => {
    const foundFoodItems = await FoodItem.find().limit(20);
    res.status(200).send(foundFoodItems);
  }
);

export { router as foodItemIndexRouter };
