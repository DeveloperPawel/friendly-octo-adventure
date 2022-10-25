import { EntreeCreatedEvent } from "@mimenu/common";
import mongoose from "mongoose";
import { Entree } from "../../models/entree";
import { FoodItem } from "../../models/fooditem";
import { Ingredient } from "../../models/ingredient";
import { natsWrapper } from "../../nats-wrapper";
import { EntreeCreatedListener } from "../listeners/entree/entree-created-listener";

const setup = async () => {
  const listener = new EntreeCreatedListener(natsWrapper.client);

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
  const foodItem = FoodItem.build({
    foodItemId,
    name: "avacado toast",
    ingredients: [bread, avacado],
  });
  await foodItem.save();

  const entreeId = new mongoose.Types.ObjectId().toHexString();

  const eventData: EntreeCreatedEvent[`data`] = {
    entreeId,
    name: "avacado toast breakfast",
    foodItems: [foodItemId],
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, eventData, message, entreeId };
};

it("creates an entree", async () => {
  const { listener, eventData, message, entreeId } = await setup();

  await listener.onMessage(eventData, message);

  const foundEntree = await Entree.findOne({ entreeId });

  expect(foundEntree).toBeDefined();
});

it("acks the message", async () => {
  const { listener, eventData, message, entreeId } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
