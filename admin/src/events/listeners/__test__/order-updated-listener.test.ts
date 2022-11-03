import { OrderUpdateEvent } from "@mimenu/common";
import mongoose from "mongoose";
import { Entree } from "../../../models/entree";
import { FoodItem } from "../../../models/fooditem";
import { Ingredient } from "../../../models/ingredient";
import { Order } from "../../../models/order";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderUpdatedListener } from "../order/order-updated-listener";

const setup = async () => {
  const listener = new OrderUpdatedListener(natsWrapper.client);

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

  const entree2 = Entree.build({
    name: "toast",
    foodItems: [foodItem],
  });
  await entree2.save();

  const order = Order.build({
    entree,
    date: new Date(),
    patientId,
    orderId,
  });
  await order.save();

  const eventData: OrderUpdateEvent[`data`] = {
    entree: entree.id,
    orderId,
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return {
    listener,
    eventData,
    message,
    orderId,
    entree2,
  };
};

it("updates an order", async () => {
  const { listener, eventData, message, orderId } = await setup();

  const foundOrder = await Order.findOne({ orderId });

  await listener.onMessage(eventData, message);

  const updateOrder = await Order.findOne({ orderId });
  expect(updateOrder!.entree != foundOrder!.entree);
});

it("acks the message", async () => {
  const { listener, eventData, message, orderId } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
