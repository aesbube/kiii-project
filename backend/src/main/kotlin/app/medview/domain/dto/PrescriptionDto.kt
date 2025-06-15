package app.medview.domain.dto

import app.medview.domain.PrescriptionStatus
import java.time.LocalDate
import java.time.temporal.ChronoUnit

data class PrescriptionDto(
    val id: String?,
    val patientId: Long?,
    val patientNameAndSurname: String?,
    val doctorId: Long?,
    val doctorNameAndSurname: String?,
    val medicine: String?,
    val frequency: String?,
    var status: PrescriptionStatus = PrescriptionStatus.ACTIVE,
    val expirationDate: LocalDate? = LocalDate.now().plus(3, ChronoUnit.MONTHS),
)