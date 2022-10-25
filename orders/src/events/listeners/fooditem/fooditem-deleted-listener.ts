import {
  BadRequestError,
  FoodItemDeletedEvent,
  Listener,
  NotFoundError,
  Subjects,
} from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { FoodItem } from "../../../models/fooditem";
import { queueGroupName } from "../queue-group-name";

export class FoodItemDeletedListener extends Listener<FoodItemDeletedEvent> {
  subject: Subjects.FoodItemDeleted = Subjects.FoodItemDeleted;
  queueGroupName: string = queueGroupName;
  async onMessage(data: FoodItemDeletedEvent[`data`], message: Message) {
    await FoodItem.deleteOne(
      { foodItemId: data.foodItemId },
      (err: any, doc: any) => {
        if (err) throw new BadRequestError();
        if (doc.acknowledged && doc.deletedCount == 1) {
          message.ack();
        } else {
          throw new NotFoundError();
        }
      }
    ).clone();
  }
}
