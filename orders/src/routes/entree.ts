import { NotFoundError, patientAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Entree } from "../models/entree";

const router = express.Router();

router.get(
  "/api/order/entree/:entreeId",
  patientAuth,
  async (req: Request, res: Response) => {
    const foundEntree = await Entree.findOne({
      entreeId: req.params.entreeId,
    }).populate({ path: "foodItems", populate: { path: "ingredients" } });

    if (!foundEntree) {
      throw new NotFoundError();
    }

    res.status(200).send(foundEntree);
  }
);

export { router as entreeRouter };
