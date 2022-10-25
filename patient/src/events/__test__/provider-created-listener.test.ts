import { ProviderCreatedEvent } from "@mimenu/common";
import mongoose from "mongoose";
import { Provider } from "../../model/provider";
import { natsWrapper } from "../../nats-wrapper";
import { PatientCreatedListener } from "../listeners/patient/patient-created-listener";

const setup = async () => {
  const listener = new PatientCreatedListener(natsWrapper.client);

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

it("should create a provider", async () => {
  const { listener, eventData, message, providerId } = await setup();

  await listener.onMessage(eventData, message);

  const foundProvider = await Provider.findOne({ providerId });

  expect(foundProvider).toBeDefined();
});

it("should ack the message", async () => {
  const { listener, eventData, message, providerId } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
