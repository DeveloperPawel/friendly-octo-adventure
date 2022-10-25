import { EntreeUpdatedEvent } from "@mimenu/common";
import mongoose from "mongoose";
import { Entree } from "../../models/entree";
import { FoodItem } from "../../models/fooditem";
import { Ingredient } from "../../models/ingredient";
import { natsWrapper } from "../../nats-wrapper";
import { EntreeUpdatedListener } from "../listeners/entree/entree-updated-listener";

const setup = async () => {
  const listener = new EntreeUpdatedListener(natsWrapper.client);

  const bread = Ingredient.build({
    ingredientId: new mongoose.Types.ObjectId().toHexString(),
    name: "bread",
  });
  await bread.save();

  const foodItemId = new mongoose.Types.ObjectId().toHexString();

  const fooditem = FoodItem.build({
    foodItemId,
    name: "avacado toast",
    ingredients: [bread],
  });
  await fooditem.save();

  const secondFoodItemId = new mongoose.Types.ObjectId().toHexString();
  const secondfooditem = FoodItem.build({
    foodItemId: secondFoodItemId,
    name: "avacado toast",
    ingredients: [bread],
  });
  await secondfooditem.save();

  const entreeId = new mongoose.Types.ObjectId().toHexString();

  const entree = Entree.build({
    entreeId,
    name: "French Toast",
    foodItems: [secondfooditem],
  });
  await entree.save();

  const eventData: EntreeUpdatedEvent[`data`] = {
    entreeId,
    foodItems: [foodItemId],
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return {
    listener,
    message,
    entreeId,
    eventData,
  };
};

it("updates an entree", async () => {
  const { listener, message, entreeId, eventData } = await setup();

  await listener.onMessage(eventData, message);

  const foundentree = await Entree.findOne({ entreeId });
  expect(foundentree!.foodItems!.length).toEqual(2);
});

it("acks the message", async () => {
  const { listener, eventData, message } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
