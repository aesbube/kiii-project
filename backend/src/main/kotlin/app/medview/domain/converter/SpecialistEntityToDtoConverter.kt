package app.medview.domain.converter

import app.medview.domain.dto.users.SpecialistDto
import app.medview.domain.users.Specialist
import org.springframework.stereotype.Component

@Component
class SpecialistEntityToDtoConverter {
    fun convert(specialist: Specialist) = SpecialistDto(
        username = specialist.username,
        email = specialist.email,
        name = specialist.name,
        surname = specialist.surname,
        phone = specialist.phone,
        address = specialist.address,
        birthDate = specialist.birthDate,
        specialty = specialist.specialty,
        licenseNumber = specialist.licenseNumber,
        yearsOfExperience = specialist.yearsOfExperience,
    )
}