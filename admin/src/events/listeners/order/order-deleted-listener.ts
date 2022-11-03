import { Listener, OrderDeletedEvent, Subjects } from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "../queue-group-name";

export class OrderDeletedListener extends Listener<OrderDeletedEvent> {
  subject: Subjects.OrderDeleted = Subjects.OrderDeleted;
  queueGroupName: string = queueGroupName;
  onMessage(data: OrderDeletedEvent[`data`], message: Message): void {
    throw new Error("Method not implemented.");
  }
}
