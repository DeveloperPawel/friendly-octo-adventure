import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface EntreeCreatedEvent extends Event {
  subject: Subjects.EntreeCreated;
  data: {
    entreeId: string;
    name: string;
    foodItems: Array<string>;
  };
}
