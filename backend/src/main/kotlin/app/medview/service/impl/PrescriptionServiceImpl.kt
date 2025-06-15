package app.medview.service.impl


import app.medview.domain.Prescription
import app.medview.domain.PrescriptionStatus
import app.medview.domain.dto.PrescriptionRequestDto
import app.medview.domain.users.Doctor
import app.medview.exceptions.*
import app.medview.repository.PatientRepository
import app.medview.repository.PrescriptionRepository
import app.medview.service.PrescriptionService
import app.medview.service.users.DoctorService
import app.medview.service.users.PatientService
import app.medview.service.users.PharmacistService
import jakarta.transaction.Transactional
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class PrescriptionServiceImpl(
    private val prescriptionRepository: PrescriptionRepository,
    @Lazy
    private val patientService: PatientService,
    @Lazy
    private val doctorService: DoctorService,
    @Lazy
    private val pharmacistService: PharmacistService,
    private val patientRepository: PatientRepository
) : PrescriptionService {

    @Transactional
    override fun create(patientId: Long, doctor: Doctor, prescriptionRequestDto: PrescriptionRequestDto): Prescription {
        val patient = patientRepository.findById(patientId)
            .orElseThrow { PatientNotFoundException(patientId.toString()) }
        val prescription = Prescription(
            patient = patient,
            doctor = doctor,
            medicine = prescriptionRequestDto.medicine,
            frequency = prescriptionRequestDto.frequency,
            lastModifiedBy = doctor.username
        )
        return prescriptionRepository.save(prescription)
    }

    @Transactional
    override fun redeem(pharmacistId: Long, prescriptionId: String, patientId: Long): Prescription {

        val prescription: Prescription =
            prescriptionRepository
                .findById(prescriptionId)
                .orElseThrow { PrescriptionNotFoundException(prescriptionId) }

        if (patientService.getPatientById(prescription.patient?.id ?: throw NullPatientException())
            != patientService.getPatientById(patientId))
            throw IllegalPrescriptionRedeemerException(prescriptionId, patientId)

        if (prescription.status == PrescriptionStatus.CANCELED)
            throw PrescriptionCanceledException(prescriptionId)

        if (prescription.status == PrescriptionStatus.EXPIRED)
            throw PrescriptionExpiredException(prescriptionId)

        if (prescription.status == PrescriptionStatus.REDEEMED)
            throw PrescriptionAlreadyRedeemedException(prescriptionId)


        prescription.status = PrescriptionStatus.REDEEMED
        prescription.lastModifiedBy = pharmacistService.getPharmacistById(pharmacistId).username
        prescription.lastModifiedDate = LocalDate.now()

        return prescriptionRepository.save(prescription)
    }

    @Transactional
    override fun cancel(patientId: Long, doctorId: Long, prescriptionId: String): Prescription {
        val patient = patientService.getPatientById(patientId)
        val doctor = doctorService.getDoctorById(doctorId)

        if (patient.doctor != doctor)
            throw IllegalDoctorPatientOperation(doctorId, patientId)

        val prescription: Prescription =
            prescriptionRepository
                .findById(prescriptionId)
                .orElseThrow { PrescriptionNotFoundException(prescriptionId) }

        if (prescription.status == PrescriptionStatus.REDEEMED)
            throw PrescriptionAlreadyRedeemedException(prescriptionId)

        if (prescription.status == PrescriptionStatus.ACTIVE)
            prescription.status = PrescriptionStatus.CANCELED

        prescription.lastModifiedBy = doctor.username
        prescription.lastModifiedDate = LocalDate.now()

        return prescriptionRepository.save(prescription)
    }


    override fun getPrescriptionById(prescriptionId: String): Prescription {
        return prescriptionRepository.findById(prescriptionId).orElseThrow { PrescriptionNotFoundException(prescriptionId) }
    }

    override fun getPrescriptionsByPatientId(patientId: Long): List<Prescription> {
        return prescriptionRepository.findByPatientId(patientId)
    }
}