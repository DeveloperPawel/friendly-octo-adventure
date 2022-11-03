import {
  Listener,
  NotFoundError,
  OrderCreatedEvent,
  Subjects,
} from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { Entree } from "../../../models/entree";
import { Order } from "../../../models/order";
import { Patient } from "../../../models/patient";
import { queueGroupName } from "../queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: OrderCreatedEvent[`data`], message: Message) {
    const entree = await Entree.findOne({ id: data.entree });

    if (!entree) {
      throw new NotFoundError();
    }

    const patient = await Patient.findOne({ patientId: data.patientId });

    if (!patient) {
      throw new NotFoundError();
    }

    const order = Order.build({
      entree,
      date: new Date(data.date),
      patientId: data.patientId,
      orderId: data.orderId,
    });
    await order.save();

    message.ack();
  }
}
