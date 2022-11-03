import {
  Listener,
  NotFoundError,
  OrderUpdateEvent,
  Subjects,
} from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { Entree } from "../../../models/entree";
import { Order } from "../../../models/order";
import { queueGroupName } from "../queue-group-name";

export class OrderUpdatedListener extends Listener<OrderUpdateEvent> {
  subject: Subjects.OrderUpdated = Subjects.OrderUpdated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: OrderUpdateEvent[`data`], message: Message) {
    const foundOrder = await Order.findOne({ orderId: data.orderId });
    if (!foundOrder) {
      throw new NotFoundError();
    }

    const foundEntree = await Entree.findOne({ id: data.entree });
    if (!foundEntree) {
      throw new NotFoundError();
    }

    foundOrder.entree = foundEntree;
    await foundOrder.save();
    message.ack();
  }
}
