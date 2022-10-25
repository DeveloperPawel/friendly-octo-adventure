import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface PreferenceAddedEvent extends Event {
  subject: Subjects.PreferenceAdded;
  data: {
    preferenceId: string;
    patientId: string;
  };
}
