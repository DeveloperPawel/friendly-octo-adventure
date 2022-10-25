import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface DayUpdatedEvent extends Event {
  subject: Subjects.DayUpdated;
  data: {
    date?: Date;
    dayId: string;
    breakfast?: Array<string>;
    lunch?: Array<string>;
    dinner?: Array<string>;
  };
}
