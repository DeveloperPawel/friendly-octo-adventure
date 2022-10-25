import {
  BadRequestError,
  IngredientDeletedEvent,
  Listener,
  NotFoundError,
  Subjects,
} from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { Ingredient } from "../../../models/ingredient";
import { queueGroupName } from "../queue-group-name";

export class IngredientDeletedListener extends Listener<IngredientDeletedEvent> {
  subject: Subjects.IngredientDeleted = Subjects.IngredientDeleted;
  queueGroupName: string = queueGroupName;
  async onMessage(data: IngredientDeletedEvent[`data`], message: Message) {
    await Ingredient.deleteOne(
      { ingredientId: data.ingredientId },
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
