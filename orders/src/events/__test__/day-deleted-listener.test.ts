import { DayDeletedEvent } from "@mimenu/common";
import mongoose from "mongoose";
import { Day } from "../../models/day";
import { natsWrapper } from "../../nats-wrapper";
import { DayDeletedListener } from "../listeners/day/day-deleted-listener";

const setup = async () => {
  const listener = new DayDeletedListener(natsWrapper.client);

  const dayId = new mongoose.Types.ObjectId().toHexString();

  const day = Day.build({
    dayId,
    date: new Date(),
  });
  await day.save();

  const eventData: DayDeletedEvent[`data`] = {
    dayId,
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, eventData, message, day, dayId };
};

it("deletes a patient", async () => {
  const { listener, eventData, message, day, dayId } = await setup();

  const firstDay = await Day.findOne({ dayId });
  expect(firstDay).toBeDefined();

  await listener.onMessage(eventData, message);

  const nullDay = await Day.findOne({ dayId });
  expect(nullDay).toBeNull();
});

it("acks the message", async () => {
  const { listener, eventData, message, day, dayId } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
