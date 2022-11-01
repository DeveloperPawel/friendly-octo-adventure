import { PatientDeletedEvent } from "@mimenu/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { User, UserType } from "../../../models/user";
import { natsWrapper } from "../../../nats-wrapper";
import { PatientDeletedListener } from "../patient/patient-deleted-listener";

const setup = async () => {
  const listener = new PatientDeletedListener(natsWrapper.client);

  const userId = new mongoose.Types.ObjectId().toHexString();

  const patient = User.build({
    email: "test@gmail.com",
    password: "password",
    role: UserType.Patient,
  });
  await patient.save();

  const eventData: PatientDeletedEvent[`data`] = {
    id: userId,
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, eventData, message, patient, userId };
};

it("deletes a patient", async () => {
  const { listener, eventData, message, patient, userId } = await setup();

  await listener.onMessage(eventData, message);

  const nullPatient = await User.findById(patient.id);

  expect(nullPatient).toBeNull();
});

it("acks the message", async () => {
  const { listener, eventData, message, patient, userId } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
