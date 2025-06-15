package app.medview.domain.converter

import app.medview.domain.Prescription
import app.medview.domain.dto.PrescriptionDto
import org.springframework.stereotype.Component

@Component
class PrescriptionEntityToDtoConverter {
    fun convert(prescription: Prescription) = PrescriptionDto(
        id = prescription.id,
        patientId = prescription.patient?.id,
        patientNameAndSurname = prescription.patient?.name + " " + prescription.patient?.surname,
        doctorId = prescription.doctor?.id,
        doctorNameAndSurname = prescription.doctor?.name + " " + prescription.doctor?.surname,
        medicine = prescription.medicine,
        frequency = prescription.frequency,
        status = prescription.status,
        expirationDate = prescription.expirationDate
    )
}