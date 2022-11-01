import { PatientDeletedEvent, Publisher, Subjects } from "@mimenu/common";

export class PatientDeletedPublisher extends Publisher<PatientDeletedEvent> {
  subject: Subjects.PatientDeleted = Subjects.PatientDeleted;
}
