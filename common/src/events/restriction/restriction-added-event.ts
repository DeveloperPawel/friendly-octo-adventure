import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface RestrictionAddedEvent extends Event {
  subject: Subjects.RestrictionCreated;
  data: {
    restrictionId: string;
    patientId: string;
  };
}
