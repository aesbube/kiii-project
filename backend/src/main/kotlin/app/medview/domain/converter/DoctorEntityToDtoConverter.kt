package app.medview.domain.converter

import app.medview.domain.dto.users.DoctorDto
import app.medview.domain.users.Doctor
import org.springframework.stereotype.Component

@Component
class DoctorEntityToDtoConverter {
    fun convert(doctor: Doctor) = DoctorDto(
        username = doctor.username,
        email = doctor.email,
        name = doctor.name ?: "",
        surname = doctor.surname ?: "",
        phone = doctor.phone ?: "",
        address = doctor.address ?: "",
        birthDate = doctor.birthDate,
        specialty = doctor.specialty ?: "",
        licenseNumber = doctor.licenseNumber ?: "",
        yearsOfExperience = doctor.yearsOfExperience ?: 0,
        hospitalName = doctor.hospitalName ?: ""
    )
}