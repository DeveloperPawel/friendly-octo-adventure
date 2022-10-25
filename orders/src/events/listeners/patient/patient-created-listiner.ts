import { Listener, PatientCreatedEvent, Subjects } from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { Patient } from "../../../models/patient";
import { queueGroupName } from "../queue-group-name";

export class PatientCreatedListener extends Listener<PatientCreatedEvent> {
  subject: Subjects.PatientCreated = Subjects.PatientCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: PatientCreatedEvent[`data`], message: Message) {
    const newPatient = Patient.build({
      patientId: data.id,
    });
    await newPatient.save();

    message.ack();
  }
}
