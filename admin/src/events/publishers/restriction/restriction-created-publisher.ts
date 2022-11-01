import { Publisher, RestrictionCreatedEvent, Subjects } from "@mimenu/common";

export class RestrictionCreatedPublisher extends Publisher<RestrictionCreatedEvent> {
  subject: Subjects.RestrictionCreated = Subjects.RestrictionCreated;
}
