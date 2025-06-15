export interface Appointment {
  id: number;
  scheduleId: number;
  patientName: string | null;
  assigneeName: string | null;
  date: string;
  time: string;
  location: string;
  refNumber: string;
  status: string;
}
