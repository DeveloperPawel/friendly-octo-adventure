import {
  BadRequestError,
  Listener,
  NotFoundError,
  OrderDeletedEvent,
  Subjects,
} from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../../models/order";
import { queueGroupName } from "../queue-group-name";

export class OrderDeletedListener extends Listener<OrderDeletedEvent> {
  subject: Subjects.OrderDeleted = Subjects.OrderDeleted;
  queueGroupName: string = queueGroupName;
  async onMessage(data: OrderDeletedEvent[`data`], message: Message) {
    await Order.deleteOne({ orderId: data.orderId }, (err: any, doc: any) => {
      if (err) throw new BadRequestError();
      if (doc.acknowledged && doc.deletedCount == 1) {
        message.ack();
      } else {
        throw new NotFoundError();
      }
    }).clone();
  }
}
