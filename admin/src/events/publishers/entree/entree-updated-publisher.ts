import { EntreeUpdatedEvent, Publisher, Subjects } from "@mimenu/common";

export class EntreeUpdatedPublisher extends Publisher<EntreeUpdatedEvent> {
  subject: Subjects.EntreeUpdated = Subjects.EntreeUpdated;
}
