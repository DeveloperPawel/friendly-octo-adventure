import { Listener, ProviderCreatedEvent, Subjects } from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "../queue-group-name";

export class ProviderCreatedlistener extends Listener<ProviderCreatedEvent> {
  subject: Subjects.ProviderCreated = Subjects.ProviderCreated;
  queueGroupName: string = queueGroupName;
  onMessage(data: ProviderCreatedEvent[`data`], message: Message): void {
    throw new Error("Method not implemented.");
  }
}
