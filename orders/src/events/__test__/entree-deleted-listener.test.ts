import { EntreeDeletedEvent } from "@mimenu/common";
import mongoose from "mongoose";
import { Entree } from "../../models/entree";
import { FoodItem } from "../../models/fooditem";
import { Ingredient } from "../../models/ingredient";
import { natsWrapper } from "../../nats-wrapper";
import { EntreeDeletedListener } from "../listeners/entree/entree-deleted-listener";

const setup = async () => {
  const listener = new EntreeDeletedListener(natsWrapper.client);

  const bread = Ingredient.build({
    ingredientId: new mongoose.Types.ObjectId().toHexString(),
    name: "bread",
  });
  await bread.save();

  const foodItem = FoodItem.build({
    foodItemId: new mongoose.Types.ObjectId().toHexString(),
    name: "toast",
    ingredients: [bread],
  });
  await foodItem.save();

  const entreeId = new mongoose.Types.ObjectId().toHexString();

  const entree = Entree.build({
    entreeId,
    name: "French Toast",
    foodItems: [foodItem],
  });
  await entree.save();

  const eventData: EntreeDeletedEvent[`data`] = {
    entreeId,
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, eventData, message, entree, entreeId };
};

it("deletes a patient", async () => {
  const { listener, eventData, message, entree, entreeId } = await setup();

  const foundEntree = await Entree.findOne({ entreeId });
  expect(foundEntree).toBeDefined();

  await listener.onMessage(eventData, message);

  const nullEntree = await Entree.findOne({ entreeId });
  expect(nullEntree).toBeNull();
});

it("acks the message", async () => {
  const { listener, eventData, message, entree, entreeId } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
