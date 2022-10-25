import {
  DayUpdatedEvent,
  Listener,
  NotFoundError,
  Subjects,
} from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { Day } from "../../../models/day";
import { Entree } from "../../../models/entree";
import { queueGroupName } from "../queue-group-name";

export class DayUpdatedListener extends Listener<DayUpdatedEvent> {
  subject: Subjects.DayUpdated = Subjects.DayUpdated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: DayUpdatedEvent[`data`], message: Message) {
    const day = await Day.findOne({ dayId: data.dayId });

    if (!day) {
      throw new NotFoundError();
    }

    let updateObject: any = {};

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        updateObject[key] = value;
      }
    }

    if (updateObject.date) {
      day.date = updateObject.date;
    }

    if (updateObject.breakfast) {
      if (!day.breakfast) day.breakfast = [];
      for (const breakfastId of updateObject.breakfast) {
        const breakfast = await Entree.findOne({ entreeId: breakfastId });

        if (breakfast) {
          day.breakfast.push(breakfast);
        }
      }
    }

    if (updateObject.lunch) {
      if (!day.lunch) day.lunch = [];
      for (const lunchId of updateObject.lunch) {
        const lunch = await Entree.findOne({ entreeId: lunchId });

        if (lunch) {
          day.lunch.push(lunch);
        }
      }
    }

    if (updateObject.dinner) {
      if (!day.dinner) day.dinner = [];
      for (const dinnerId of updateObject.dinner) {
        const dinner = await Entree.findOne({ entreeId: dinnerId });

        if (dinner) {
          day.dinner.push(dinner);
        }
      }
    }
    await day.save();

    message.ack();
  }
}
