import { Subjects } from "../subjects";
import { Event } from "../base-event";

export interface PatientProviderUpdatedAdminEvent extends Event {
  subject: Subjects.PatientProviderChangeAdmin;
  data: {
    patientId: string;
    providerId: string | null;
  };
}
