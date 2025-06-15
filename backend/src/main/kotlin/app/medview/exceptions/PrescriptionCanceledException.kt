package app.medview.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.BAD_REQUEST)
class PrescriptionCanceledException(prescriptionId: String)
    : RuntimeException("Unable to redeem canceled prescription with ID $prescriptionId")