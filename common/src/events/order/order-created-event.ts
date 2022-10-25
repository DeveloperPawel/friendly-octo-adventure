import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface OrderCreatedEvent extends Event {
  subject: Subjects.OrderCreated;
  data: {
    entree: string;
    date: Date;
    patientId: string;
    orderId: string;
  };
}
