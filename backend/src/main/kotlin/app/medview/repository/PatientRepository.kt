package app.medview.repository

import app.medview.domain.users.Doctor
import app.medview.domain.users.Patient
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PatientRepository : JpaRepository<Patient, Long> {
    fun findByUsername(username: String): Patient?
    fun findByDoctorId(doctorId: Long): List<Patient>
    fun searchByNameContainingIgnoreCaseOrSurnameContainingIgnoreCaseOrUsernameContainingIgnoreCaseAndDoctorIsNull(
        name: String,
        surname: String,
        username: String,
    ): List<Patient>

    fun searchByNameContainingIgnoreCaseOrSurnameContainingIgnoreCaseOrUsernameContainingIgnoreCaseAndDoctorId(
        name: String,
        surname: String,
        username: String,
        doctorId: Long
    ): List<Patient>
}