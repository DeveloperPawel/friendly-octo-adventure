import { Publisher, Subjects } from "@mimenu/common";
import { PatientProviderUpdatedPatientEvent } from "@mimenu/common";

export class PatientProviderUpdatedPublisher extends Publisher<PatientProviderUpdatedPatientEvent> {
  subject: Subjects.PatientProviderChangePatient =
    Subjects.PatientProviderChangePatient;
}
