import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface ProviderCreatedEvent extends Event {
  subject: Subjects.ProviderCreated;
  data: {
    id: string;
  };
}
