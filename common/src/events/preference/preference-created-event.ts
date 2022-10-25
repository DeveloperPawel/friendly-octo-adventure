import { UserType } from "../../types/UserTypes";
import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface PreferenceCreatedEvent extends Event {
  subject: Subjects.PreferenceCreated;
  data: {
    preferenceId: string;
    value: string;
    userType: UserType;
  };
}
