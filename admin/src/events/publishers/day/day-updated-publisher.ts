import { DayUpdatedEvent, Publisher, Subjects } from "@mimenu/common";

export class DayUpdatedPublisher extends Publisher<DayUpdatedEvent> {
  subject: Subjects.DayUpdated = Subjects.DayUpdated;
}
