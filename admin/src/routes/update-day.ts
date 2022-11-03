import { adminAuth, NotFoundError } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Day } from "../models/day";
import { Entree } from "../models/entree";

const router = express.Router();

router.post(
  "/api/admin/update-day",
  adminAuth,
  async (req: Request, res: Response) => {
    const { dayId, date, breakfast, lunch, dinner } = req.body;

    const foundDay = await Day.findOne({ id: dayId });
    if (!foundDay) {
      throw new NotFoundError();
    }

    if (breakfast.length > 0) {
      if (!foundDay.breakfast) foundDay.breakfast = [];
      for (const breakfastId of breakfast) {
        const foundEntree = await Entree.findOne({ id: breakfastId });
        if (!foundEntree) {
          throw new NotFoundError();
        }
        foundDay.breakfast!.push(foundEntree);
      }
    } else {
      foundDay.breakfast = [];
    }

    if (lunch.length > 0) {
      if (!foundDay.lunch) foundDay.lunch = [];
      for (const lunchId of lunch) {
        const foundEntree = await Entree.findOne({ id: lunchId });
        if (!foundEntree) {
          throw new NotFoundError();
        }
        foundDay.lunch!.push(foundEntree);
      }
    } else {
      foundDay.lunch = [];
    }

    if (dinner.length > 0) {
      if (!foundDay.dinner) foundDay.dinner = [];
      for (const dinnerId of dinner) {
        const foundEntree = await Entree.findOne({ id: dinnerId });
        if (!foundEntree) {
          throw new NotFoundError();
        }
        foundDay.dinner!.push(foundEntree);
      }
    } else {
      foundDay.dinner = [];
    }

    foundDay.date = new Date(date);

    await foundDay.save();

    res.status(200).send(foundDay);
  }
);

export { router as updateDayRouter };
