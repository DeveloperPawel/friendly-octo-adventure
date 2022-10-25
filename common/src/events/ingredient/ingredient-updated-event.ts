import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface IngredientUpdatedEvent extends Event {
  subject: Subjects.IngredientUpdated;
  data: {
    ingredientId: string;
    name: string;
  };
}
