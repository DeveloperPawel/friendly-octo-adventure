import { FoodItemDeletedEvent } from "@mimenu/common";
import mongoose from "mongoose";
import { Entree } from "../../models/entree";
import { FoodItem } from "../../models/fooditem";
import { Ingredient } from "../../models/ingredient";
import { natsWrapper } from "../../nats-wrapper";
import { FoodItemDeletedListener } from "../listeners/fooditem/fooditem-deleted-listener";

const setup = async () => {
  const listener = new FoodItemDeletedListener(natsWrapper.client);

  const bread = Ingredient.build({
    ingredientId: new mongoose.Types.ObjectId().toHexString(),
    name: "bread",
  });
  await bread.save();

  const foodItemId = new mongoose.Types.ObjectId().toHexString();

  const foodItem = FoodItem.build({
    foodItemId,
    name: "toast",
    ingredients: [bread],
  });
  await foodItem.save();

  const eventData: FoodItemDeletedEvent[`data`] = {
    foodItemId,
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, eventData, message, foodItemId };
};

it("deletes a fooditem", async () => {
  const { listener, eventData, message, foodItemId } = await setup();

  const foundFoodItem = await FoodItem.findOne({ foodItemId });
  expect(foundFoodItem).toBeDefined();

  await listener.onMessage(eventData, message);

  const nullfoodItem = await Entree.findOne({ foodItemId });
  expect(nullfoodItem).toBeNull();
});

it("acks the message", async () => {
  const { listener, eventData, message, foodItemId } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
