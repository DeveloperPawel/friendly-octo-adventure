import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface IngredientCreatedEvent extends Event {
  subject: Subjects.IngredientCreated;
  data: {
    ingredientId: string;
    name: string;
  };
}
