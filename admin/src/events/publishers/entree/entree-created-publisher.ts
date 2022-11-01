import { EntreeCreatedEvent, Subjects } from "@mimenu/common";
import { Publisher } from "@mimenu/common";

export class EntreeCreatedPublisher extends Publisher<EntreeCreatedEvent> {
  subject: Subjects.EntreeCreated = Subjects.EntreeCreated;
}
