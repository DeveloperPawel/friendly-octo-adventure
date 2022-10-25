import {
  DayUpdatedEvent,
  EntreeUpdatedEvent,
  FoodItemUpdatedEvent,
  formatDateAlpha,
} from "@mimenu/common";
import mongoose from "mongoose";
import { Day } from "../../models/day";
import { Entree } from "../../models/entree";
import { FoodItem } from "../../models/fooditem";
import { Ingredient } from "../../models/ingredient";
import { natsWrapper } from "../../nats-wrapper";
import { FoodItemUpdatedListener } from "../listeners/fooditem/fooditem-updated-listener";

const setup = async () => {
  const listener = new FoodItemUpdatedListener(natsWrapper.client);

  const bread = Ingredient.build({
    ingredientId: new mongoose.Types.ObjectId().toHexString(),
    name: "bread",
  });
  await bread.save();

  const ingredientId = new mongoose.Types.ObjectId().toHexString();
  const secondbread = Ingredient.build({
    ingredientId,
    name: "second bread",
  });
  await secondbread.save();

  const foodItemId = new mongoose.Types.ObjectId().toHexString();

  const fooditem = FoodItem.build({
    foodItemId,
    name: "avacado toast",
    ingredients: [bread],
  });
  await fooditem.save();

  const eventData: FoodItemUpdatedEvent[`data`] = {
    foodItemId,
    ingredients: [ingredientId],
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return {
    listener,
    message,
    foodItemId,
    eventData,
  };
};

it("updates a fooditem", async () => {
  const { listener, message, foodItemId, eventData } = await setup();

  await listener.onMessage(eventData, message);

  const foundFoodItem = await FoodItem.findOne({ foodItemId });
  expect(foundFoodItem!.ingredients!.length).toEqual(2);
});

it("acks the message", async () => {
  const { listener, eventData, message } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
