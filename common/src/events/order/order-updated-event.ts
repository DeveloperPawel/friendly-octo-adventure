import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface OrderUpdateEvent extends Event {
  subject: Subjects.OrderUpdated;
  data: {
    entree: string;
    orderId: string;
  };
}
