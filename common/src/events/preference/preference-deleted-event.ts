import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface PreferenceDeletedEvent extends Event {
  subject: Subjects.PreferenceDeleted;
  data: {
    preferenceId: string;
  };
}
