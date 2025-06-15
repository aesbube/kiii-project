package app.medview.domain.dto.users

import jakarta.validation.constraints.Email
import java.time.LocalDate

data class PharmacistDto(
    val username: String,
    val email: String,
    val name: String,
    val surname: String,
    val phone: String,
    val address: String,
    val birthDate: LocalDate?,
    val licenseNumber: Int,
    val pharmacyName: String,
    val pharmacyAddress: String
)
