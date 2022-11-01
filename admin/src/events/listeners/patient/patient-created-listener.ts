import { PatientCreatedEvent, Subjects } from "@mimenu/common";
import { Listener } from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "../queue-group-name";

export class PatientCreatedListener extends Listener<PatientCreatedEvent> {
  subject: Subjects.PatientCreated = Subjects.PatientCreated;
  queueGroupName: string = queueGroupName;
  onMessage(data: PatientCreatedEvent[`data`], message: Message): void {
    throw new Error("Method not implemented.");
  }
}
