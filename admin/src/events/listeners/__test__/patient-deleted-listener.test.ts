import { PatientCreatedEvent } from "@mimenu/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { natsWrapper } from "../../../nats-wrapper";
import { PatientCreatedListener } from "../patient/patient-created-listener";

const setup = async () => {
  const listener = new PatientCreatedListener(natsWrapper.client);

  const patientId = new mongoose.Types.ObjectId().toHexString();

  const eventData: PatientCreatedEvent[`data`] = {
    id: patientId,
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, eventData, message, patientId };
};

it("creates a patient", async () => {});

it("acks the message", async () => {});
