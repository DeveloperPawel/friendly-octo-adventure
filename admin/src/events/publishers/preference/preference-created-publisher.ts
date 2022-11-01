import { PreferenceCreatedEvent, Publisher, Subjects } from "@mimenu/common";

export class PreferenceCreatedPublisher extends Publisher<PreferenceCreatedEvent> {
  subject: Subjects.PreferenceCreated = Subjects.PreferenceCreated;
}
