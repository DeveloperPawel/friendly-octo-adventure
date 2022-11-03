import { Listener, OrderCreatedEvent, Subjects } from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "../queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;
  onMessage(data: OrderCreatedEvent[`data`], message: Message): void {
    throw new Error("Method not implemented.");
  }
}
