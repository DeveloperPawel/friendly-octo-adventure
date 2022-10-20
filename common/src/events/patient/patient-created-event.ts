import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface PatientCreatedEvent extends Event {
  subject: Subjects.PatientCreated;
  data: {
    id: string;
  };
}
