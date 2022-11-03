import { adminAuth, NotFoundError } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Ingredient } from "../models/ingredient";

const router = express.Router();

router.post(
  "/api/admin/update-ingredient",
  adminAuth,
  async (req: Request, res: Response) => {
    const { ingredientId, name } = req.body;

    const foundIngredient = await Ingredient.findOne({ id: ingredientId });
    if (!foundIngredient) {
      throw new NotFoundError();
    }

    foundIngredient.name = name;
    await foundIngredient.save();
    res.status(200).send(foundIngredient);
  }
);

export { router as updateIngredientRouter };
