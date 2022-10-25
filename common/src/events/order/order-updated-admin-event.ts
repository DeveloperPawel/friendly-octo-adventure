import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface OrderUpdatedAdminEvent extends Event {
  subject: Subjects.OrderUpdatedAdmin;
  data: {
    entree: string;
    orderId: string;
  };
}
