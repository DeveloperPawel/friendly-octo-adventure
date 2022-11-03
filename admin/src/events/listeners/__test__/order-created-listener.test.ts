import { formatDateAlpha, OrderCreatedEvent } from "@mimenu/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Entree } from "../../../models/entree";
import { FoodItem } from "../../../models/fooditem";
import { Ingredient } from "../../../models/ingredient";
import { Order } from "../../../models/order";
import { Patient } from "../../../models/patient";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order/order-created-listener";

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const orderId = new mongoose.Types.ObjectId().toHexString();
  const patientId = new mongoose.Types.ObjectId().toHexString();

  const patient = Patient.build({
    patientId,
  });
  await patient.save();

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

  const eventData: OrderCreatedEvent[`data`] = {
    entree: entree.id,
    date: new Date(formatDateAlpha(new Date())),
    patientId,
    orderId,
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, eventData, message, orderId };
};

it("creates an order", async () => {
  const { listener, eventData, message, orderId } = await setup();

  listener.onMessage(eventData, message);

  const foundOrder = await Order.findOne({ id: orderId });

  expect(foundOrder).toBeDefined();
});

it("acks the message", async () => {
  const { listener, eventData, message, orderId } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
