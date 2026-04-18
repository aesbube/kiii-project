package app.medview.domain.dto.users

import java.time.LocalDate

data class PharmacistUpdateRequestDto (
    val username: String?,
    val email: String?,
    val name: String?,
    val surname: String?,
    val phone: String?,
    val address: String?,
    val birthDate: LocalDate?,
    val licenseNumber: String?,
    val pharmacyName: String?,
    val pharmacyAddress: String?
)