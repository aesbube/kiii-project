package app.medview.exceptions

import app.medview.domain.Prescription
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.NOT_FOUND)
class PrescriptionNotFoundException (prescriptionId: String)
    : RuntimeException("Prescription with ID $prescriptionId not found")