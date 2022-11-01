import { PreferenceDeletedEvent, Publisher, Subjects } from "@mimenu/common";

export class PreferenceDeletedPublisher extends Publisher<PreferenceDeletedEvent> {
  subject: Subjects.PreferenceDeleted = Subjects.PreferenceDeleted;
}
