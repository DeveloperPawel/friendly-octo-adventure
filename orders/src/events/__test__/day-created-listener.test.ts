import { DayCreatedEvent } from "@mimenu/common";
import mongoose from "mongoose";
import { Day } from "../../models/day";
import { natsWrapper } from "../../nats-wrapper";
import { DayCreatedListener } from "../listeners/day/day-created-listener";

const setup = async () => {
  const listener = new DayCreatedListener(natsWrapper.client);

  const dayId = new mongoose.Types.ObjectId().toHexString();

  const eventData: DayCreatedEvent[`data`] = {
    dayId,
    date: new Date(),
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, eventData, message, dayId };
};

it("creates a day", async () => {
  const { listener, eventData, message, dayId } = await setup();

  await listener.onMessage(eventData, message);

  const foundDay = await Day.findOne({ dayId });

  expect(foundDay).toBeDefined();
});

it("acks the message", async () => {
  const { listener, eventData, message, dayId } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
