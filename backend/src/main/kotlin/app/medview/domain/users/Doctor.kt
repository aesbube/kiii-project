package app.medview.domain.users

import app.medview.domain.Role
import app.medview.domain.User
import jakarta.persistence.Entity
import jakarta.persistence.Table
import java.time.LocalDate

@Entity
@Table(name = "doctors")
class Doctor(
    id: Long = 0,
    username: String = "",
    password: String = "",
    email: String = "",
    var name: String? = "",
    var surname: String? = "",
    var phone: String? = "",
    var address: String? = "",
    var birthDate: LocalDate? = null,
    var specialty: String? = "",
    var licenseNumber: String? = "",
    var yearsOfExperience: Int? = 0,
    var hospitalName: String? = "",
) : User(
    id = id,
    username = username,
    password = password,
    email = email,
    role = Role.DOCTOR
)