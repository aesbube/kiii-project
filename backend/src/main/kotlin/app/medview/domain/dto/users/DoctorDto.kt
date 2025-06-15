package app.medview.domain.dto.users

import java.time.LocalDate

data class DoctorDto(
    val username: String,
    val email: String?,
    val name: String?,
    val surname: String?,
    val phone: String?,
    val address: String?,
    val birthDate: LocalDate?,
    val specialty: String?,
    val licenseNumber: String?,
    val yearsOfExperience: Int?,
    val hospitalName: String?,
)
