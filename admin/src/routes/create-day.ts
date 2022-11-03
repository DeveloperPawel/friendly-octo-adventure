import { adminAuth, NotFoundError } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Day } from "../models/day";
import { Entree } from "../models/entree";

const router = express.Router();

router.post(
  "/api/admin/create-day",
  adminAuth,
  async (req: Request, res: Response) => {
    const { date, breakfast, lunch, dinner } = req.body;

    let dayObject: any = { date, breakfast: [], lunch: [], dinner: [] };

    for (const entreeId of breakfast) {
      let entree = await Entree.findOne({ id: entreeId });
      if (!entree) {
        throw new NotFoundError();
      }
      dayObject.breakfast.push(entree);
    }

    for (const entreeId of lunch) {
      let entree = await Entree.findOne({ id: entreeId });
      if (!entree) {
        throw new NotFoundError();
      }
      dayObject.lunch.push(entree);
    }

    for (const entreeId of dinner) {
      let entree = await Entree.findOne({ id: entreeId });
      if (!entree) {
        throw new NotFoundError();
      }
      dayObject.dinner.push(entree);
    }

    const day = Day.build({
      date: new Date(date),
      breakfast: dayObject.breakfast,
      lunch: dayObject.lunch,
      dinner: dayObject.dinner,
    });
    await day.save();

    res.status(201).send(day);
  }
);

export { router as createDayRouter };
