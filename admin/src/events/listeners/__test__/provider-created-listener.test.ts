import { ProviderCreatedEvent } from "@mimenu/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Provider } from "../../../models/provider";
import { natsWrapper } from "../../../nats-wrapper";
import { ProviderCreatedListener } from "../provider/provider-created-listener";

const setup = async () => {
  const listener = new ProviderCreatedListener(natsWrapper.client);

  const providerId = new mongoose.Types.ObjectId().toHexString();

  const eventData: ProviderCreatedEvent[`data`] = {
    id: providerId,
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, eventData, message, providerId };
};

it("creates a patient", async () => {
  const { listener, eventData, message, providerId } = await setup();

  listener.onMessage(eventData, message);

  const foundProvider = await Provider.findOne({ id: providerId });

  expect(foundProvider).toBeDefined();
});

it("acks the message", async () => {
  const { listener, eventData, message, providerId } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
