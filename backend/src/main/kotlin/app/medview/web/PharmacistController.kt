package app.medview.web

import app.medview.domain.Prescription
import app.medview.domain.dto.PrescriptionDto
import app.medview.domain.dto.PrescriptionScanDto
import app.medview.domain.dto.users.PharmacistDto
import app.medview.domain.dto.users.PharmacistUpdateRequestDto
import app.medview.domain.users.Pharmacist
import app.medview.service.users.PharmacistService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/pharmacists")
class PharmacistController(private val pharmacistService: PharmacistService) {
    @GetMapping
    fun getAllDoctors(): ResponseEntity<List<PharmacistDto>> {
        val pharmacists = pharmacistService.getAllPharmacists()
        return ResponseEntity.ok(pharmacists)
    }

    @PostMapping("/update")
    fun addDetailsToDoctor(@RequestBody pharmacistUpdateRequestDto: PharmacistUpdateRequestDto): ResponseEntity<String> {
        val response = pharmacistService.addDetailsToPharmacist(pharmacistUpdateRequestDto)
        return ResponseEntity.ok(response.message)
    }

    @GetMapping("/prescription")
    fun getPrescription(
        @RequestParam ("prescriptionId") prescriptionId : String,
        @RequestParam ("patientId") patientId : Long,
    ) : ResponseEntity<PrescriptionDto>{
        val prescription = pharmacistService
            .getPrescription(PrescriptionScanDto(prescriptionId,patientId))
        return ResponseEntity(prescription,HttpStatus.OK)
    }

    @PostMapping("/prescription")
    fun redeemPrescription(
        @RequestBody prescriptionScanDto: PrescriptionScanDto
    ): ResponseEntity<PrescriptionDto> {
        val prescription = pharmacistService.validatePrescription(prescriptionScanDto)
        return ResponseEntity(prescription, HttpStatus.OK)
    }
}