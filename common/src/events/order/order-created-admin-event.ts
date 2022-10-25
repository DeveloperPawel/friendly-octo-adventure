import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface OrderCreatedAdminEvent extends Event {
  subject: Subjects.OrderCreatedAdmin;
  data: {
    entree: string;
    date: Date;
    patientId: string;
    orderId: string;
  };
}
