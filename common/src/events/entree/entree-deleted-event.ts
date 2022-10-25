import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface EntreeDeletedEvent extends Event {
  subject: Subjects.EntreeDeleted;
  data: {
    entreeId: string;
  };
}
