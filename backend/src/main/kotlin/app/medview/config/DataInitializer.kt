//package app.medview.config
//
//import app.medview.domain.Prescription
//import app.medview.domain.Role
//import app.medview.domain.users.Doctor
//import app.medview.domain.users.Patient
//import app.medview.domain.users.Pharmacist
//import app.medview.domain.users.Specialist
//import app.medview.domain.User
//import app.medview.repository.*
//
//import org.springframework.boot.CommandLineRunner
//import org.springframework.security.crypto.password.PasswordEncoder
//import org.springframework.stereotype.Component
//
//@Component
//class DataInitializer(
//    private val patientRepository: PatientRepository,
//    private val doctorRepository: DoctorRepository,
//    private val specialistRepository: SpecialistRepository,
//    private val pharmacistRepository: PharmacistRepository,
//    private val prescriptionRepository: PrescriptionRepository,
//    private val userRepository: UserRepository,
//    private val passwordEncoder: PasswordEncoder
//) : CommandLineRunner {
//
//    private val logger = org.slf4j.LoggerFactory.getLogger(DataInitializer::class.java)
//
//    @Transactional
//    override fun run(vararg args: String) {
//        if (doctorRepository.count() == 0L && patientRepository.count() == 0L) { //Note the `0L` for Long comparison
//            logger.info("Initializing mock data...")
//
//            val doctor1 = Doctor(
//                username = "Cece",
//                password = passwordEncoder.encode("pass"),
//                email = "cece@example.com",
//                specialty = "General Practitioner",
//            )
//            doctorRepository.save(doctor1)
//
//            val doctor2 = Doctor(
//                username = "Stole",
//                password = passwordEncoder.encode("pass"),
//                email = "stole@example.com",
//                specialty = "General Practitioner",
//            )
//            doctorRepository.save(doctor2)
//
//            val specialist1 = Specialist(
//                username = "Xhoni",
//                password = passwordEncoder.encode("pass"),
//                email = "xhoni@example.com",
//                specialty = "Gynecologist"
//            )
//            specialistRepository.save(specialist1)
//
//
//            // Create some patients for the doctor
//            val patient1 = Patient(
//                doctor = doctor1,
//                username = "Sneze",
//                password = passwordEncoder.encode("pass"),
//                email = "sneze@example.com"
//            )
//            patientRepository.save(patient1)
//
//            val patient2 = Patient(
//                doctor = doctor1,
//                username = "Boki",
//                password = passwordEncoder.encode("pass"),
//                email = "boki@example.com"
//            )
//            patientRepository.save(patient2)
//
//            val patient3 = Patient(
//                doctor = doctor2,
//                username = "Janko",
//                password = passwordEncoder.encode("pass"),
//                email = "janko@example.com"
//            )
//            patientRepository.save(patient3)
//
//            val patient4 = Patient(
//                doctor = doctor2,
//                username = "Trajanka",
//                password = passwordEncoder.encode("pass"),
//                email = "trajanka@example.com"
//            )
//            patientRepository.save(patient4)
//
//
//
//            val pharmacist1 = Pharmacist(
//                username = "Bile",
//                password = passwordEncoder.encode("pass"),
//                email = "bile@example.com"
//            )
//            pharmacistRepository.save(pharmacist1)
//
//            val prescription1 = Prescription(
//                medicine = "Analgin",
//                frequency = "1x Day",
//                lastModifiedBy = doctor2.username,
//                patient = patient1,
//                doctor = doctor1
//            )
//            prescriptionRepository.save(prescription1)
//
//            val prescription2 = Prescription(
//                medicine = "Paracetamol",
//                frequency = "Every 6h",
//                lastModifiedBy = doctor2.username,
//                patient = patient1,
//                doctor = doctor1
//            )
//            prescriptionRepository.save(prescription2)
//
//
//
//            val admin = User(
//                username = "admin",
//                password = passwordEncoder.encode("pass"),
//                email = "admin@example.com",
//                role = Role.ADMIN
//            )
//            userRepository.save(admin)
//
//            logger.info("Mock data initialized successfully.")
//        } else {
//            logger.info("Data already exists. Skipping initialization.")
//        }
//    }
//}
//
//annotation class Transactional
