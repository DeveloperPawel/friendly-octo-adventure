import { FoodItemCreatedEvent, Listener, Subjects } from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { FoodItem } from "../../../models/fooditem";
import { Ingredient, IngredientDoc } from "../../../models/ingredient";
import { queueGroupName } from "../queue-group-name";

export class FoodItemCreatedListener extends Listener<FoodItemCreatedEvent> {
  subject: Subjects.FoodItemCreated = Subjects.FoodItemCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: FoodItemCreatedEvent[`data`], message: Message) {
    let ingredientList: Array<IngredientDoc> = [];

    for (const ingredientId of data.ingredients) {
      const ingredient = await Ingredient.findOne({ ingredientId });

      if (ingredient) {
        ingredientList.push(ingredient);
      }
    }

    const foodItem = FoodItem.build({
      foodItemId: data.foodItemId,
      name: data.name,
      ingredients: ingredientList,
    });
    await foodItem.save();

    message.ack();
  }
}
