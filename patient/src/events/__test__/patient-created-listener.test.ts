import { PatientDeletedEvent, UserType } from "@mimenu/common";
import mongoose from "mongoose";
import { Patient } from "../../model/patient";
import { natsWrapper } from "../../nats-wrapper";
import { PatientCreatedListener } from "../listeners/patient/patient-created-listener";

const setup = async () => {
  const listener = new PatientCreatedListener(natsWrapper.client);

  const patientId = new mongoose.Types.ObjectId().toHexString();

  const eventData: PatientDeletedEvent[`data`] = {
    id: patientId,
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, eventData, message, patientId };
};

it("should create a patient", async () => {
  const { listener, eventData, message, patientId } = await setup();

  await listener.onMessage(eventData, message);

  const foundPatient = await Patient.findOne({ patientId });

  expect(foundPatient).toBeDefined();
});

it("should ack the message", async () => {
  const { listener, eventData, message, patientId } = await setup();
  await listener.onMessage(eventData, message);
  expect(message.ack).toHaveBeenCalled();
});
