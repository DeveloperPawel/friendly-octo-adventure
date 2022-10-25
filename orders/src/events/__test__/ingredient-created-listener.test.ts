import { IngredientCreatedEvent } from "@mimenu/common";
import mongoose from "mongoose";
import { Ingredient } from "../../models/ingredient";
import { natsWrapper } from "../../nats-wrapper";
import { IngredientCreatedListener } from "../listeners/ingredient/ingredient-created-listener";

const setup = async () => {
  const listener = new IngredientCreatedListener(natsWrapper.client);

  const ingredientId = new mongoose.Types.ObjectId().toHexString();

  const eventData: IngredientCreatedEvent[`data`] = {
    ingredientId,
    name: "avacado",
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, eventData, message, ingredientId };
};

it("creates an entree", async () => {
  const { listener, eventData, message, ingredientId } = await setup();

  await listener.onMessage(eventData, message);

  const foundIngredient = await Ingredient.findOne({ ingredientId });

  expect(foundIngredient).toBeDefined();
});

it("acks the message", async () => {
  const { listener, eventData, message, ingredientId } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
