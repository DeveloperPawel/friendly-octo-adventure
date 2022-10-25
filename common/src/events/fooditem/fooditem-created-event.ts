import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface FoodItemCreatedEvent extends Event {
  subject: Subjects.FoodItemCreated;
  data: {
    foodItemId: string;
    name: string;
    ingredients: Array<string>;
  };
}
