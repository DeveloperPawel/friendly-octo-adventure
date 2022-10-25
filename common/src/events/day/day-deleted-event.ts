import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface DayDeletedEvent extends Event {
  subject: Subjects.DayDeleted;
  data: {
    dayId: string;
  };
}
