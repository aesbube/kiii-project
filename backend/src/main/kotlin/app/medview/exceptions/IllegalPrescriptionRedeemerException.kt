package app.medview.exceptions

class IllegalPrescriptionRedeemerException (prescriptionId : String, patientId: Long)
    : RuntimeException("Patient with ID $patientId is not able to redeem prescription with ID $prescriptionId")