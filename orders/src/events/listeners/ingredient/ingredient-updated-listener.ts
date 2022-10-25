import {
  IngredientUpdatedEvent,
  Listener,
  NotFoundError,
  Subjects,
} from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { Ingredient } from "../../../models/ingredient";
import { queueGroupName } from "../queue-group-name";

export class IngredientUpdatedListener extends Listener<IngredientUpdatedEvent> {
  subject: Subjects.IngredientUpdated = Subjects.IngredientUpdated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: IngredientUpdatedEvent[`data`], message: Message) {
    const foundIngredient = await Ingredient.findOne({
      ingredientId: data.ingredientId,
    });

    if (!foundIngredient) {
      throw new NotFoundError();
    }

    foundIngredient.name = data.name;
    await foundIngredient.save();

    message.ack();
  }
}
