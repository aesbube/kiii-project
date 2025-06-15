package app.medview.domain.dto.users

import app.medview.domain.BloodType
import java.time.LocalDate

data class PatientDto(
    val id: Long?,
    val doctor: DoctorDto?,
    val username: String,
    val email: String,
    val name: String,
    val surname: String,
    val phone: String,
    val address: String,
    val birthDate: LocalDate?,
    val birthPlace: String,
    val allergies: String,
    val bloodType: BloodType?,
)
