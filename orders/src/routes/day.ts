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
        { path: "breakfast", model: "Entree" },
        { path: "lunch", model: "Entree" },
        { path: "dinner", model: "Entree" },
      ])
      .exec();

    console.log(foundDay);
    if (!foundDay) {
      throw new NotFoundError();
    }

    res.status(200).send(foundDay);
  }
);

export { router as getOneDayRouter };
