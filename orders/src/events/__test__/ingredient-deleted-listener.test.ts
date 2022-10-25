import { IngredientDeletedEvent } from "@mimenu/common";
import mongoose from "mongoose";
import { Ingredient } from "../../models/ingredient";
import { natsWrapper } from "../../nats-wrapper";
import { IngredientDeletedListener } from "../listeners/ingredient/ingredient-deleted-listener";

const setup = async () => {
  const listener = new IngredientDeletedListener(natsWrapper.client);

  const ingredientId = new mongoose.Types.ObjectId().toHexString();
  const bread = Ingredient.build({
    ingredientId,
    name: "bread",
  });
  await bread.save();

  const eventData: IngredientDeletedEvent[`data`] = {
    ingredientId,
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, eventData, message, ingredientId };
};

it("deletes an ingredient", async () => {
  const { listener, eventData, message, ingredientId } = await setup();

  const foundIngredient = await Ingredient.findOne({ ingredientId });
  expect(foundIngredient).toBeDefined();

  await listener.onMessage(eventData, message);

  const nullIngredient = await Ingredient.findOne({ ingredientId });
  expect(nullIngredient).toBeNull();
});

it("acks the message", async () => {
  const { listener, eventData, message, ingredientId } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
