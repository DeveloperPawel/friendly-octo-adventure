import { Subjects } from "../subjects";
import { Event } from "../base-event";

export interface PatientProviderUpdatedPatientEvent extends Event {
  subject: Subjects.PatientProviderChangePatient;
  data: {
    patientId: string;
    providerId: string | null;
  };
}
