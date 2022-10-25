import { Subjects } from "../subjects";
import { Event } from "../base-event";

export interface PatientChangeDischargeAdminEvent extends Event {
  subject: Subjects.PatientChangedDischargeAdmin;
  data: {
    patientId: string;
    discharge: Date;
  };
}
