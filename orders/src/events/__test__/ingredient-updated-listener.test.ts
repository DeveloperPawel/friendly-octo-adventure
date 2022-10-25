import { IngredientUpdatedEvent } from "@mimenu/common";
import mongoose from "mongoose";
import { Ingredient } from "../../models/ingredient";
import { natsWrapper } from "../../nats-wrapper";
import { IngredientUpdatedListener } from "../listeners/ingredient/ingredient-updated-listener";

const setup = async () => {
  const listener = new IngredientUpdatedListener(natsWrapper.client);

  const ingredientId = new mongoose.Types.ObjectId().toHexString();
  const previousValue = "bread";
  const bread = Ingredient.build({
    ingredientId,
    name: previousValue,
  });
  await bread.save();

  const updatedValue = "updated bread";

  const eventData: IngredientUpdatedEvent[`data`] = {
    ingredientId,
    name: updatedValue,
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return {
    listener,
    eventData,
    message,
    ingredientId,
    updatedValue,
    previousValue,
  };
};

it("updates an ingredient", async () => {
  const {
    listener,
    eventData,
    message,
    ingredientId,
    updatedValue,
    previousValue,
  } = await setup();

  const foundIngredient = await Ingredient.findOne({ ingredientId });
  expect(foundIngredient!.name).toEqual(previousValue);

  await listener.onMessage(eventData, message);

  const updatedIngredient = await Ingredient.findOne({ ingredientId });
  expect(updatedIngredient!.name).toEqual(updatedValue);
});

it("acks the message", async () => {
  const { listener, eventData, message, ingredientId } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
