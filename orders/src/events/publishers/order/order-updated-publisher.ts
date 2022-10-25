import { OrderUpdateEvent, Publisher, Subjects } from "@mimenu/common";

export class OrderUpdatedPublisher extends Publisher<OrderUpdateEvent> {
  subject: Subjects.OrderUpdated = Subjects.OrderUpdated;
}
