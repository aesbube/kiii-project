import { BloodType } from './blood-type.model';
import {Doctor} from './doctor.model';

export interface Patient {
  id: number,
  username: String,
  email: String,
  doctor: Doctor,
  name: String,
  surname: String,
  phone: String,
  address: String,
  birthDate: Date,
  birthPlace: String,
  allergies: String,
  bloodType: BloodType,
}
