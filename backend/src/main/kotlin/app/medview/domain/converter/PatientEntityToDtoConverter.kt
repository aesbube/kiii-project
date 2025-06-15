package app.medview.domain.converter

import app.medview.domain.dto.users.PatientDto
import app.medview.domain.users.Patient
import org.springframework.stereotype.Component

@Component
class PatientEntityToDtoConverter(
    private val doctorConverter: DoctorEntityToDtoConverter
) {
    fun convert(patient: Patient) = PatientDto(
        id = patient.id,
        username = patient.username,
        email = patient.email,
        doctor = patient.doctor?.let { doctorConverter.convert(it) },
        name = patient.name?: "",
        surname = patient.surname?: "",
        phone = patient.phone?: "",
        address = patient.address?: "",
        birthDate = patient.birthDate,
        birthPlace = patient.birthPlace?: "",
        allergies = patient.allergies?: "",
        bloodType = patient.bloodType,
    )
}