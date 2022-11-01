import { IngredientCreatedEvent, Publisher, Subjects } from "@mimenu/common";

export class IngredientCreatedPublisher extends Publisher<IngredientCreatedEvent> {
  subject: Subjects.IngredientCreated = Subjects.IngredientCreated;
}
