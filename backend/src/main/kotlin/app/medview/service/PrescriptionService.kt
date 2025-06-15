package app.medview.service

import app.medview.domain.Prescription
import app.medview.domain.dto.PrescriptionRequestDto
import app.medview.domain.users.Doctor

interface PrescriptionService {
    fun create(patientId: Long, doctor: Doctor, prescriptionRequestDto: PrescriptionRequestDto) : Prescription
    fun redeem(pharmacistId: Long, prescriptionId: String, patientId: Long) : Prescription
    fun cancel(patientId: Long, doctorId: Long, prescriptionId: String): Prescription
    fun getPrescriptionById(prescriptionId: String) : Prescription
    fun getPrescriptionsByPatientId(patientId: Long) : List<Prescription>

}