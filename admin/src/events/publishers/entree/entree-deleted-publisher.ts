import { EntreeDeletedEvent, Subjects } from "@mimenu/common";
import { Publisher } from "@mimenu/common";

export class EntreeDeletedPublisher extends Publisher<EntreeDeletedEvent> {
  subject: Subjects.EntreeDeleted = Subjects.EntreeDeleted;
}
