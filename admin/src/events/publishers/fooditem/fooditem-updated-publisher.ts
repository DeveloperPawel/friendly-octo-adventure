import { FoodItemUpdatedEvent, Publisher, Subjects } from "@mimenu/common";

export class FoodItemUpdatedPublisher extends Publisher<FoodItemUpdatedEvent> {
  subject: Subjects.FoodItemUpdated = Subjects.FoodItemUpdated;
}
