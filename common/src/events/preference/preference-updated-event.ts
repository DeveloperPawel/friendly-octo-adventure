import { UserType } from "../../types/UserTypes";
import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface PreferenceUpdateEvent extends Event {
  subject: Subjects.PreferenceUpdated;
  data: {
    preferenceId: string;
    value?: string;
    userType?: UserType;
  };
}
