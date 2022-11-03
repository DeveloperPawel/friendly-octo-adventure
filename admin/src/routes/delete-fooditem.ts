import { adminAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { FoodItem } from "../models/fooditem";

const router = express.Router();

router.post(
  "/api/admin/delete-fooditem",
  adminAuth,
  async (req: Request, res: Response) => {
    const { fooditemId } = req.body;
    await FoodItem.deleteOne({ id: fooditemId });
    res.status(202).send({});
  }
);

export { router as deleteFoodItemRouter };
