package app.medview.domain.users

import app.medview.domain.BloodType
import app.medview.domain.Role
import app.medview.domain.User
import jakarta.persistence.Entity
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import java.time.LocalDate

@Entity
@Table(name = "patients")
class Patient(
    id: Long = 0,
    username: String = "",
    password: String = "",
    email: String = "",
    var name: String? = "",
    var surname: String? = "",
    var phone: String? = "",
    var address: String? = "",
    var birthDate: LocalDate? = null,
    var birthPlace: String? = "",
    var allergies: String? = "",
    var bloodType: BloodType? = null,
    @ManyToOne
    var doctor: Doctor? = null,
) : User(
    id = id,
    username = username,
    password = password,
    email = email,
    role = Role.PATIENT
)
