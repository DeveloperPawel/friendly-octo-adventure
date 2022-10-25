import { Publisher, OrderCreatedEvent, Subjects } from "@mimenu/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
