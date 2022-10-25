import {
  EntreeUpdatedEvent,
  Listener,
  NotFoundError,
  Subjects,
} from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { Entree } from "../../../models/entree";
import { FoodItem } from "../../../models/fooditem";
import { queueGroupName } from "../queue-group-name";

export class EntreeUpdatedListener extends Listener<EntreeUpdatedEvent> {
  subject: Subjects.EntreeUpdated = Subjects.EntreeUpdated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: EntreeUpdatedEvent[`data`], message: Message) {
    const foundEntree = await Entree.findOne({ entreeId: data.entreeId });

    if (!foundEntree) {
      throw new NotFoundError();
    }

    let updateObject: any = {};

    for (const [key, value] of Object.entries(data)) {
      updateObject[key] = value;
    }

    if (updateObject.foodItems) {
      if (!foundEntree.foodItems) foundEntree.foodItems = [];
      for (const foodItemId of updateObject.foodItems) {
        const foodItem = await FoodItem.findOne({ foodItemId });

        if (foodItem) {
          foundEntree.foodItems.push(foodItem);
        }
      }
    }

    if (updateObject.name) foundEntree.name = updateObject.name;

    await foundEntree.save();
    message.ack();
  }
}
