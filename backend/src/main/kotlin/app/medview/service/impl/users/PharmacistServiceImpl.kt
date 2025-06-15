package app.medview.service.impl.users

import app.medview.domain.Prescription
import app.medview.domain.Role
import app.medview.domain.converter.PharmacistEntityToDtoConverter
import app.medview.domain.converter.PrescriptionEntityToDtoConverter
import app.medview.domain.dto.MessageResponse
import app.medview.domain.dto.PrescriptionDto
import app.medview.domain.dto.PrescriptionScanDto
import app.medview.domain.dto.users.PharmacistDto
import app.medview.domain.dto.users.PharmacistUpdateRequestDto
import app.medview.domain.users.Pharmacist
import app.medview.exceptions.*
import app.medview.repository.PatientRepository
import app.medview.repository.PharmacistRepository
import app.medview.service.PrescriptionService
import app.medview.service.users.PharmacistService
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class PharmacistServiceImpl(
    private val pharmacistRepository: PharmacistRepository,
    private val prescriptionService: PrescriptionService,
    private val pharmacistConverter: PharmacistEntityToDtoConverter,
    private val prescriptionConverter: PrescriptionEntityToDtoConverter
) : PharmacistService {

    val logger = org.slf4j.LoggerFactory.getLogger(PharmacistServiceImpl::class.java)

    override fun getAllPharmacists(): List<PharmacistDto> {
        return pharmacistRepository.findAll().map { pharmacistConverter.convert(it) }
    }

    override fun getPharmacistById(id: Long): PharmacistDto {
        return pharmacistConverter.convert(pharmacistRepository.findById(id).orElseThrow {
            throw IllegalArgumentException("Pharmacist not found with id: $id")
        })
    }

    override fun addDetailsToPharmacist(pharmacistUpdateRequestDto: PharmacistUpdateRequestDto): MessageResponse {
        val auth = SecurityContextHolder.getContext().authentication
        val username = auth.name
        val pharmacist = pharmacistRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User not found with username: $username")

        if (pharmacist.role != Role.PHARMACIST) {
            throw RuntimeException("User is not a pharmacist")
        }

        pharmacist.pharmacyName = pharmacistUpdateRequestDto.pharmacyName ?: pharmacist.pharmacyName
        pharmacist.pharmacyAddress = pharmacistUpdateRequestDto.pharmacyAddress ?: pharmacist.pharmacyAddress
        pharmacist.licenseNumber = pharmacistUpdateRequestDto.licenseNumber ?: pharmacist.licenseNumber

        pharmacistRepository.save(pharmacist)
        return MessageResponse("Pharmacist details added successfully")
    }

    override fun getPrescription(prescriptionScanDto: PrescriptionScanDto): PrescriptionDto {
        val patientId = prescriptionScanDto.patientId
        val prescriptionId = prescriptionScanDto.prescriptionId
        val prescription = prescriptionService.getPrescriptionById(prescriptionId)

        if (prescriptionScanDto.patientId != prescription.patient?.id)
            throw IllegalPrescriptionRedeemerException(prescriptionId, patientId)

        return prescriptionConverter.convert(prescription)
    }

    override fun validatePrescription(prescriptionScanDto: PrescriptionScanDto): PrescriptionDto {
        logger.info(SecurityContextHolder.getContext().authentication.name)
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val pharmacist = pharmacistRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User not found with username: $username")

        return prescriptionConverter.convert(prescriptionService.redeem(pharmacist.id, prescriptionScanDto.prescriptionId, prescriptionScanDto.patientId))
    }
}