import { IngredientUpdatedEvent, Publisher, Subjects } from "@mimenu/common";

export class IngredientUpdatedPublisher extends Publisher<IngredientUpdatedEvent> {
  subject: Subjects.IngredientUpdated = Subjects.IngredientUpdated;
}
