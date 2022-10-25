import { DayCreatedEvent, Listener, Subjects } from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { Day } from "../../../models/day";
import { Entree, EntreeDoc } from "../../../models/entree";
import { queueGroupName } from "../queue-group-name";

export class DayCreatedListener extends Listener<DayCreatedEvent> {
  subject: Subjects.DayCreated = Subjects.DayCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: DayCreatedEvent[`data`], message: Message) {
    let breakfastList: Array<EntreeDoc> = [];
    let lunchList: Array<EntreeDoc> = [];
    let dinnerList: Array<EntreeDoc> = [];

    if (data.breakfast) {
      for (const breakfastId of data.breakfast) {
        const breakfast = await Entree.findOne({ entreeId: breakfastId });

        if (breakfast) {
          breakfastList.push(breakfast);
        }
      }
    }

    if (data.lunch) {
      for (const lunchId of data.lunch) {
        const lunch = await Entree.findOne({ entreeId: lunchId });

        if (lunch) {
          lunchList.push(lunch);
        }
      }
    }

    if (data.dinner) {
      for (const dinnerId of data.dinner) {
        const dinner = await Entree.findOne({ entreeId: dinnerId });

        if (dinner) {
          dinnerList.push(dinner);
        }
      }
    }

    const day = Day.build({
      dayId: data.dayId,
      date: data.date,
      breakfast: breakfastList,
      lunch: lunchList,
      dinner: dinnerList,
    });
    await day.save();

    message.ack();
  }
}
