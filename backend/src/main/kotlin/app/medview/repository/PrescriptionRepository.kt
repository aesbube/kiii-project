package app.medview.repository

import app.medview.domain.Prescription
import app.medview.domain.users.Doctor
import app.medview.domain.users.Patient
import jdk.jfr.Frequency
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface PrescriptionRepository : JpaRepository<Prescription, String> {
    fun findByPatientId(patientId: Long): List<Prescription>
}