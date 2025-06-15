package app.medview.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.BAD_REQUEST)
class PrescriptionAlreadyRedeemedException(prescriptionId: String)
    : RuntimeException("Prescription with ID $prescriptionId has already been redeemed")