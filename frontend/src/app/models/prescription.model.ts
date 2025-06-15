import { PrescriptionStatusModel } from "./prescription-status.model";

export interface Prescription {
  id: Number,
  patientId: Number,
  patientNameAndSurname: String,
  doctorId: Number,
  doctorNameAndSurname: String,
  medicine: String,
  frequency: String,
  status: PrescriptionStatusModel,
  expirationDate: Date,
}
