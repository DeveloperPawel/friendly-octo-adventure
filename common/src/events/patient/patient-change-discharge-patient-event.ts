import { Subjects } from "../subjects";
import { Event } from "../base-event";

export interface PatientChangeDischargePatientEvent extends Event {
  subject: Subjects.PatientChangedDischargePatient;
  data: {
    patientId: string;
    discharge: Date;
  };
}
