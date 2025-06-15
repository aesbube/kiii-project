package app.medview.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.BAD_REQUEST)
class PrescriptionExpiredException (prescriptionId: String)
    : RuntimeException("Unable to redeem expired prescription with Id $prescriptionId")