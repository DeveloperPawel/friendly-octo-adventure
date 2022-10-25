import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface FoodItemUpdatedEvent extends Event {
  subject: Subjects.FoodItemUpdated;
  data: {
    foodItemId: string;
    name?: string;
    ingredients?: Array<string>;
  };
}
