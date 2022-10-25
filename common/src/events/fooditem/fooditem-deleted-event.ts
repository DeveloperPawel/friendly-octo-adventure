import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface FoodItemDeletedEvent extends Event {
  subject: Subjects.FoodItemDeleted;
  data: {
    foodItemId: string;
  };
}
