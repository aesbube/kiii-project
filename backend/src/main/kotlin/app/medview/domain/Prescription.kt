package app.medview.domain

import app.medview.domain.users.Doctor
import app.medview.domain.users.Patient
import jakarta.persistence.*
import org.hibernate.annotations.GenericGenerator
import java.time.LocalDate
import java.time.temporal.ChronoUnit

@Entity
@Table(name = "prescriptions")
data class Prescription(
    @Id
    @GeneratedValue(generator = "prescription_id_generator")
    @GenericGenerator(name = "prescription_id_generator", strategy = "app.medview.util.PrescriptionIdGenerator")
    val id: String? = null,
    @ManyToOne
    var patient: Patient? = null,
    @ManyToOne
    var doctor: Doctor? = null,
    val medicine: String? = null,
    val frequency: String? = null,
    var status: PrescriptionStatus = PrescriptionStatus.ACTIVE,
    val expirationDate: LocalDate = LocalDate.now().plus(3, ChronoUnit.MONTHS),
    var lastModifiedDate: LocalDate = LocalDate.now(),
    var lastModifiedBy: String? = null
)
