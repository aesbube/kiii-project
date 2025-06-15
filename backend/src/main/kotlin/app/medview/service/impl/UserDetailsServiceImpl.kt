package app.medview.service.impl

import app.medview.domain.Role
import app.medview.repository.DoctorRepository
import app.medview.repository.PatientRepository
import app.medview.repository.PharmacistRepository
import app.medview.repository.SpecialistRepository
import app.medview.repository.UserRepository
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class UserDetailsServiceImpl(
    private val userRepository: UserRepository,
    private val doctorRepository: DoctorRepository,
    private val pharmacistRepository: PharmacistRepository,
    private val patientRepository: PatientRepository,
    private val specialistRepository: SpecialistRepository
) : UserDetailsService {

    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User not found with username: $username")

        val specializedUser = when (user.role) {
            Role.DOCTOR -> doctorRepository.findByUsername(username) ?: user
            Role.PATIENT -> patientRepository.findByUsername(username) ?: user
            Role.PHARMACIST -> pharmacistRepository.findByUsername(username) ?: user
            Role.SPECIALIST -> specialistRepository.findByUsername(username) ?: user
            else -> user
        }

        return User
            .withUsername(specializedUser.username)
            .password(specializedUser.password)
            .authorities("ROLE_${specializedUser.role.name}")
            .accountExpired(false)
            .accountLocked(false)
            .credentialsExpired(false)
            .disabled(false)
            .build()
    }
}