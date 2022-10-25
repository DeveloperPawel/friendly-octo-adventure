import { IngredientCreatedEvent, Listener, Subjects } from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { Ingredient } from "../../../models/ingredient";
import { queueGroupName } from "../queue-group-name";

export class IngredientCreatedListener extends Listener<IngredientCreatedEvent> {
  subject: Subjects.IngredientCreated = Subjects.IngredientCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: IngredientCreatedEvent[`data`], message: Message) {
    const ingredient = Ingredient.build({
      ingredientId: data.ingredientId,
      name: data.name,
    });

    await ingredient.save();
    message.ack();
  }
}
