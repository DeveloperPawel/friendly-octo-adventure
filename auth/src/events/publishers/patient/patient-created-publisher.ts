import { PatientCreatedEvent, Publisher, Subjects } from "@mimenu/common";

export class PatientCreatedPublisher extends Publisher<PatientCreatedEvent> {
  subject: Subjects.PatientCreated = Subjects.PatientCreated;
}
