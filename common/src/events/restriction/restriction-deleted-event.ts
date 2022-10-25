import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface RestrictionDeletedEvent extends Event {
  subject: Subjects.RestrictionDeleted;
  data: {
    restrictionId: string;
  };
}
