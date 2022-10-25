import { PreferenceDeletedEvent, UserType } from "@mimenu/common";
import mongoose from "mongoose";
import { Entree } from "../../models/entree";
import { Preference } from "../../models/preference";
import { natsWrapper } from "../../nats-wrapper";
import { PreferenceDeletedListener } from "../listeners/preference/preference-deleted-listener";

const setup = async () => {
  const listener = new PreferenceDeletedListener(natsWrapper.client);

  const preferenceId = new mongoose.Types.ObjectId().toHexString();

  const preference = Preference.build({
    preferenceId,
    value: "dairy",
    userType: UserType.Patient,
  });
  await preference.save();

  const eventData: PreferenceDeletedEvent[`data`] = {
    preferenceId,
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, eventData, message, preferenceId };
};

it("deletes a preference", async () => {
  const { listener, eventData, message, preferenceId } = await setup();

  const foundPreference = await Preference.findOne({ preferenceId });
  expect(foundPreference).toBeDefined();

  await listener.onMessage(eventData, message);

  const nullPreference = await Entree.findOne({ preferenceId });
  expect(nullPreference).toBeNull();
});

it("acks the message", async () => {
  const { listener, eventData, message } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
