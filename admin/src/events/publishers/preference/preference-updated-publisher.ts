import { PreferenceUpdateEvent, Publisher, Subjects } from "@mimenu/common";

export class PreferenceUpdatedPublisher extends Publisher<PreferenceUpdateEvent> {
  subject: Subjects.PreferenceUpdated = Subjects.PreferenceUpdated;
}
