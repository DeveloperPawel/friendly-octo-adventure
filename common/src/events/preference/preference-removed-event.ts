import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface PreferenceRemovedEvent extends Event {
  subject: Subjects.PreferenceRemoved;
  data: {
    preferenceId: string;
    patientId: string;
  };
}
