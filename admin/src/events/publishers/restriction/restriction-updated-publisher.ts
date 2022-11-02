import { Publisher, RestrictionUpdatedEvent, Subjects } from "@mimenu/common";

export class RestrictionUpdatedPublisher extends Publisher<RestrictionUpdatedEvent> {
  subject: Subjects.RestrictionUpdated = Subjects.RestrictionUpdated;
}
