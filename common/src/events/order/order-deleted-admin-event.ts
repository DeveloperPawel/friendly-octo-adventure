import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface OrderDeletedAdminEvent extends Event {
  subject: Subjects.OrderDeletedAdmin;
  data: {
    orderId: string;
  };
}
