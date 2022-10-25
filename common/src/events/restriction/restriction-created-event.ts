import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface RestrictionCreatedEvent extends Event {
  subject: Subjects.RestrictionCreated;
  data: {
    restrictionId: string;
    type: string;
  };
}
