import { IngredientDeletedEvent, Publisher, Subjects } from "@mimenu/common";

export class IngredientDeletedPublisher extends Publisher<IngredientDeletedEvent> {
  subject: Subjects.IngredientDeleted = Subjects.IngredientDeleted;
}
