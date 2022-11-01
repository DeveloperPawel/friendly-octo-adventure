import { DayCreatedEvent, Subjects } from "@mimenu/common";
import { Publisher } from "@mimenu/common";

export class DayCreatedPublisher extends Publisher<DayCreatedEvent> {
  subject: Subjects.DayCreated = Subjects.DayCreated;
}
