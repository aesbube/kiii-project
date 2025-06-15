package app.medview.domain.dto.users

data class PharmacistUpdateRequestDto (
    val username: String?,
    val email: String?,
    val licenseNumber: Int?,
    val pharmacyName: String?,
    val pharmacyAddress: String?
)