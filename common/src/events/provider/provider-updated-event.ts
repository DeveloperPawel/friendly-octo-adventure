import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface ProviderUpdatedEvent extends Event {
  subject: Subjects.ProviderUpdated;
  data: {
    id: string;
  };
}
