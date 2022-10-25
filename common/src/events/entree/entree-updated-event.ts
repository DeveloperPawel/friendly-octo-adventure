import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface EntreeUpdatedEvent extends Event {
  subject: Subjects.EntreeUpdated;
  data: {
    entreeId: string;
    name?: string;
    foodItems?: Array<string>;
  };
}
