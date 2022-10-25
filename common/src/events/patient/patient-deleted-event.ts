import { Subjects } from "../subjects";
import { Event } from "../base-event";

export interface PatientDeletedEvent extends Event {
  subject: Subjects.PatientDeleted;
  data: {
    id: string;
  };
}
