import { formatDate, NotFoundError, patientAuth } from "@mimenu/common";
import express, { Request, Response } from "express";
import { Day } from "../models/day";

const router = express.Router();

// required date format - YYYY-MM-DD <string>

router.get(
  "/api/order/day/:date",
  patientAuth,
  async (req: Request, res: Response) => {
    const foundDay = await Day.findOne({
      date: new Date(req.params.date),
    })
      .populate([
        {
          path: "breakfast",
          populate: [
            { path: "foodItems", populate: [{ path: "ingredients" }] },
          ],
        },
        {
          path: "lunch",
          populate: [
            { path: "foodItems", populate: [{ path: "ingredients" }] },
          ],
        },
        {
          path: "dinner",
          populate: [
            { path: "foodItems", populate: [{ path: "ingredients" }] },
          ],
        },
      ])
      .exec();

    if (!foundDay) {
      throw new NotFoundError();
    }

    res.status(200).send(foundDay);
  }
);

export { router as getOneDayRouter };
