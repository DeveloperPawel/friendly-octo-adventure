import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface OrderDeletedEvent extends Event {
  subject: Subjects.OrderDeleted;
  data: {
    orderId: string;
  };
}
