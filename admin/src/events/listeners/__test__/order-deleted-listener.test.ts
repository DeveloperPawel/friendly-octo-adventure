import { OrderDeletedEvent } from "@mimenu/common";
import mongoose from "mongoose";
import { Entree } from "../../../models/entree";
import { FoodItem } from "../../../models/fooditem";
import { Ingredient } from "../../../models/ingredient";
import { Order } from "../../../models/order";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderDeletedListener } from "../order/order-deleted-listener";

const setup = async () => {
  const listener = new OrderDeletedListener(natsWrapper.client);

  const orderId = new mongoose.Types.ObjectId().toHexString();
  const patientId = new mongoose.Types.ObjectId().toHexString();

  const ingredient = Ingredient.build({
    name: "flour",
  });
  await ingredient.save();

  const foodItem = FoodItem.build({
    name: "bread",
    ingredients: [ingredient],
  });
  await foodItem.save();

  const entree = Entree.build({
    name: "toast",
    foodItems: [foodItem],
  });
  await entree.save();

  const order = Order.build({
    entree,
    date: new Date(),
    patientId,
    orderId,
  });
  await order.save();

  const eventData: OrderDeletedEvent[`data`] = {
    orderId,
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, eventData, message, order, orderId };
};

it("deletes an order", async () => {
  const { listener, eventData, message, order, orderId } = await setup();

  const firstDay = await Order.findOne({ orderId });
  expect(firstDay).toBeDefined();

  await listener.onMessage(eventData, message);

  const nullDay = await Order.findOne({ orderId });
  expect(nullDay).toBeNull();
});

it("acks the message", async () => {
  const { listener, eventData, message, order, orderId } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
