import { Listener, OrderUpdateEvent, Subjects } from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "../queue-group-name";

export class OrderUpdatedListener extends Listener<OrderUpdateEvent> {
  subject: Subjects.OrderUpdated = Subjects.OrderUpdated;
  queueGroupName: string = queueGroupName;
  onMessage(data: OrderUpdateEvent[`data`], message: Message): void {
    throw new Error("Method not implemented.");
  }
}
