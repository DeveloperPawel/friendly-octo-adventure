import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface DayCreatedEvent extends Event {
  subject: Subjects.DayCreated;
  data: {
    date: Date;
    dayId: string;
    breakfast?: Array<string>;
    lunch?: Array<string>;
    dinner?: Array<string>;
  };
}
