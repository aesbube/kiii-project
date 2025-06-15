package app.medview.domain.converter

import app.medview.domain.dto.users.PharmacistDto
import app.medview.domain.users.Pharmacist
import org.springframework.stereotype.Component

@Component
class PharmacistEntityToDtoConverter {
    fun convert (pharmacist: Pharmacist) = PharmacistDto(
            username = pharmacist.username,
            email = pharmacist.email,
            name = pharmacist.name,
            surname = pharmacist.surname,
            phone = pharmacist.phone,
            address = pharmacist.address,
            birthDate = pharmacist.birthDate,
            licenseNumber = pharmacist.licenseNumber,
            pharmacyName = pharmacist.pharmacyName,
            pharmacyAddress = pharmacist.pharmacyAddress
        )
}