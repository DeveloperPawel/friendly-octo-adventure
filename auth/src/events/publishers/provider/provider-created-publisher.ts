import { PatientCreatedEvent, Publisher, Subjects } from "@mimenu/common";

export class ProviderCreatedPublisher extends Publisher<PatientCreatedEvent> {
  subject: Subjects.PatientCreated = Subjects.PatientCreated;
}
