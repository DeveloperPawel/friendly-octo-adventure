import { OrderDeletedAdminEvent, Publisher, Subjects } from "@mimenu/common";

export class OrderDeletedPublisher extends Publisher<OrderDeletedAdminEvent> {
  subject: Subjects.OrderDeletedAdmin = Subjects.OrderDeletedAdmin;
}
