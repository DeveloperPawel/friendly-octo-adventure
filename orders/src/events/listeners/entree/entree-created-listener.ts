import { EntreeCreatedEvent, Listener, Subjects } from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { Entree } from "../../../models/entree";
import { FoodItem, FoodItemDoc } from "../../../models/fooditem";
import { queueGroupName } from "../queue-group-name";

export class EntreeCreatedListener extends Listener<EntreeCreatedEvent> {
  subject: Subjects.EntreeCreated = Subjects.EntreeCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: EntreeCreatedEvent[`data`], message: Message) {
    let foodItemList: Array<FoodItemDoc> = [];

    for (const foodItemId of data.foodItems) {
      const foodItem = await FoodItem.findOne({ foodItemId });

      if (foodItem) {
        foodItemList.push(foodItem);
      }
    }

    const entree = Entree.build({
      entreeId: data.entreeId,
      name: data.name,
      foodItems: foodItemList,
    });
    await entree.save();

    message.ack();
  }
}
