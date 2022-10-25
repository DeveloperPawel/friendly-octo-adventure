import { Publisher, Subjects } from "@mimenu/common";
import { PatientChangeDischargePatientEvent } from "@mimenu/common";

export class PatientDischageUpdatedPublisher extends Publisher<PatientChangeDischargePatientEvent> {
  subject: Subjects.PatientChangedDischargePatient =
    Subjects.PatientChangedDischargePatient;
}
