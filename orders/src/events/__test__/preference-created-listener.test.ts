import { PreferenceCreatedEvent, UserType } from "@mimenu/common";
import mongoose from "mongoose";
import { Preference } from "../../models/preference";
import { natsWrapper } from "../../nats-wrapper";
import { PreferenceCreatedListener } from "../listeners/preference/preference-created-listener";

const setup = async () => {
  const listener = new PreferenceCreatedListener(natsWrapper.client);

  const preferenceId = new mongoose.Types.ObjectId().toHexString();

  const eventData: PreferenceCreatedEvent[`data`] = {
    preferenceId,
    value: "avacado toast",
    userType: UserType.Patient,
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, eventData, message, preferenceId };
};

it("creates a preference", async () => {
  const { listener, eventData, message, preferenceId } = await setup();

  await listener.onMessage(eventData, message);

  const foundPreference = await Preference.findOne({ preferenceId });

  expect(foundPreference).toBeDefined();
});

it("acks the message", async () => {
  const { listener, eventData, message, preferenceId } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
