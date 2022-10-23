import { NotFoundError, patientAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { FoodItem } from "../models/fooditem";

const router = express.Router();

router.get(
  "/api/order/food-item/:foodItemId",
  patientAuth,
  async (req: Request, res: Response) => {
    const foundFoodItem = await FoodItem.findOne({
      foodItemId: req.params.foodItemId,
    });

    if (!foundFoodItem) {
      throw new NotFoundError();
    }

    res.status(200).send(foundFoodItem);
  }
);

export { router as foodItemRouter };
