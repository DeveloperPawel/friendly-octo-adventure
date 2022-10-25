import { FoodItemCreatedEvent } from "@mimenu/common";
import mongoose from "mongoose";
import { FoodItem } from "../../models/fooditem";
import { Ingredient } from "../../models/ingredient";
import { natsWrapper } from "../../nats-wrapper";
import { FoodItemCreatedListener } from "../listeners/fooditem/fooditem-created-listener";

const setup = async () => {
  const listener = new FoodItemCreatedListener(natsWrapper.client);

  const breadId = new mongoose.Types.ObjectId().toHexString();
  const bread = Ingredient.build({
    ingredientId: breadId,
    name: "bread",
  });
  await bread.save();

  const avacadoId = new mongoose.Types.ObjectId().toHexString();
  const avacado = Ingredient.build({
    ingredientId: avacadoId,
    name: "avacado",
  });
  await avacado.save();

  const foodItemId = new mongoose.Types.ObjectId().toHexString();

  const eventData: FoodItemCreatedEvent[`data`] = {
    foodItemId,
    name: "avacado toast",
    ingredients: [breadId, avacadoId],
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, eventData, message, foodItemId };
};

it("creates an entree", async () => {
  const { listener, eventData, message, foodItemId } = await setup();

  await listener.onMessage(eventData, message);

  const foundFoodItem = await FoodItem.findOne({ foodItemId });

  expect(foundFoodItem).toBeDefined();
});

it("acks the message", async () => {
  const { listener, eventData, message, foodItemId } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
