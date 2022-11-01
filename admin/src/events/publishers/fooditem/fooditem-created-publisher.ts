import { FoodItemCreatedEvent, Subjects } from "@mimenu/common";
import { Publisher } from "@mimenu/common";

export class FoodItemCreatedPublisher extends Publisher<FoodItemCreatedEvent> {
  subject: Subjects.FoodItemCreated = Subjects.FoodItemCreated;
}
