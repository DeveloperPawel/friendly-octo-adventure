import { RestrictionCreatedEvent } from "@mimenu/common";
import mongoose from "mongoose";
import { Restriction } from "../../models/restriction";
import { natsWrapper } from "../../nats-wrapper";
import { RestrictionCreatedListener } from "../listeners/restriction/restriction-created-listener";

const setup = async () => {
  const listener = new RestrictionCreatedListener(natsWrapper.client);

  const restrictionId = new mongoose.Types.ObjectId().toHexString();

  const eventData: RestrictionCreatedEvent[`data`] = {
    restrictionId,
    type: "mech soft",
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, eventData, message, restrictionId };
};

it("creates a restiction", async () => {
  const { listener, eventData, message, restrictionId } = await setup();

  await listener.onMessage(eventData, message);

  const foundRestriction = await Restriction.findOne({ restrictionId });

  expect(foundRestriction).toBeDefined();
});

it("acks the message", async () => {
  const { listener, eventData, message } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
