import { FoodItemDeletedEvent, Publisher, Subjects } from "@mimenu/common";

export class FoodItemDeletedpublisher extends Publisher<FoodItemDeletedEvent> {
  subject: Subjects.FoodItemDeleted = Subjects.FoodItemDeleted;
}
