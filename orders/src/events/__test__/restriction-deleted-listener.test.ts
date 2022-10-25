import {
  PreferenceDeletedEvent,
  RestrictionDeletedEvent,
  UserType,
} from "@mimenu/common";
import mongoose from "mongoose";
import { Entree } from "../../models/entree";
import { Preference } from "../../models/preference";
import { Restriction } from "../../models/restriction";
import { natsWrapper } from "../../nats-wrapper";
import { PreferenceDeletedListener } from "../listeners/preference/preference-deleted-listener";
import { RestrictionDeletedListener } from "../listeners/restriction/restriction-deleted-listener";

const setup = async () => {
  const listener = new RestrictionDeletedListener(natsWrapper.client);

  const restrictionId = new mongoose.Types.ObjectId().toHexString();

  const restriction = Restriction.build({
    restrictionId,
    type: "mech soft",
  });
  await restriction.save();

  const eventData: RestrictionDeletedEvent[`data`] = {
    restrictionId,
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, eventData, message, restrictionId };
};

it("deletes a restriction", async () => {
  const { listener, eventData, message, restrictionId } = await setup();

  const foundRestriction = await Restriction.findOne({ restrictionId });
  expect(foundRestriction).toBeDefined();

  await listener.onMessage(eventData, message);

  const nullRestriction = await Restriction.findOne({ restrictionId });
  expect(nullRestriction).toBeNull();
});

it("acks the message", async () => {
  const { listener, eventData, message } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
