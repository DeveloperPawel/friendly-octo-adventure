import { Publisher, RestrictionDeletedEvent, Subjects } from "@mimenu/common";

export class RestrictionDeletedPublisher extends Publisher<RestrictionDeletedEvent> {
  subject: Subjects.RestrictionDeleted = Subjects.RestrictionDeleted;
}
