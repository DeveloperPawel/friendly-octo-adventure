import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface RestrictionUpdatedEvent extends Event {
  subject: Subjects.RestrictionUpdated;
  data: {
    restrictionId: string;
    type: string;
  };
}
