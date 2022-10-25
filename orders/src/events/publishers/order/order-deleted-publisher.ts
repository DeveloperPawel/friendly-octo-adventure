import { OrderDeletedEvent, Publisher, Subjects } from "@mimenu/common";

export class OrderDeletedPublisher extends Publisher<OrderDeletedEvent> {
  subject: Subjects.OrderDeleted = Subjects.OrderDeleted;
}
