import {
  FoodItemUpdatedEvent,
  Listener,
  NotFoundError,
  Subjects,
} from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { FoodItem } from "../../../models/fooditem";
import { Ingredient } from "../../../models/ingredient";
import { queueGroupName } from "../queue-group-name";

export class FoodItemUpdatedListener extends Listener<FoodItemUpdatedEvent> {
  subject: Subjects.FoodItemUpdated = Subjects.FoodItemUpdated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: FoodItemUpdatedEvent[`data`], message: Message) {
    const foundFoodItem = await FoodItem.findOne({
      foodItemId: data.foodItemId,
    });

    if (!foundFoodItem) {
      throw new NotFoundError();
    }

    let updateObject: any = {};

    for (const [key, value] of Object.entries(data)) {
      updateObject[key] = value;
    }

    if (updateObject.name) {
      foundFoodItem.name = updateObject.name;
    }

    if (updateObject.ingredients) {
      if (!foundFoodItem.ingredients) foundFoodItem.ingredients = [];
      for (const ingredientId of updateObject.ingredients) {
        const ingredient = await Ingredient.findOne({ ingredientId });

        if (ingredient) {
          foundFoodItem.ingredients.push(ingredient);
        }
      }
    }

    await foundFoodItem.save();
    message.ack();
  }
}
