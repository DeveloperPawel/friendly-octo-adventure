import { Event } from "../base-event";
import { Subjects } from "../subjects";

export interface IngredientDeletedEvent extends Event {
  subject: Subjects.IngredientDeleted;
  data: {
    ingredientId: string;
  };
}
