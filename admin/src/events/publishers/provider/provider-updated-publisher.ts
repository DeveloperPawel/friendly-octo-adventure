import { ProviderUpdatedEvent, Publisher, Subjects } from "@mimenu/common";

export class ProviderUpdatedPublisher extends Publisher<ProviderUpdatedEvent> {
  subject: Subjects.ProviderUpdated = Subjects.ProviderUpdated;
}
