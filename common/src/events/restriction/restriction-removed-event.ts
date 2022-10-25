import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface RestrictionRemovedEvent extends Event {
  subject: Subjects.RestrictionRemoved;
  data: {
    restrictionId: string;
    patientId: string;
  };
}
