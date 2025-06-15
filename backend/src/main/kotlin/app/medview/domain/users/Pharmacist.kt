package app.medview.domain.users

import app.medview.domain.Role
import app.medview.domain.User
import jakarta.persistence.Entity
import jakarta.persistence.Table
import java.time.LocalDate

@Entity
@Table(name = "pharmacists")
class Pharmacist(
    id: Long = 0,
    username: String = "",
    password: String = "",
    email: String = "",
    var name: String = "",
    var surname: String = "",
    var phone: String = "",
    var address: String = "",
    var birthDate: LocalDate? = null,
    var pharmacyName: String = "",
    var pharmacyAddress: String = "",
    var licenseNumber: Int = 0,
) : User(
    id = id,
    username = username,
    password = password,
    email = email,
    role = Role.PHARMACIST
)