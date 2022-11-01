import { DayDeletedEvent, Publisher, Subjects } from "@mimenu/common";

export class DayDeletedPublisher extends Publisher<DayDeletedEvent> {
  subject: Subjects.DayDeleted = Subjects.DayDeleted;
}
