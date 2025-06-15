package app.medview.repository

import app.medview.domain.users.Doctor
import app.medview.domain.users.Specialist
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface SpecialistRepository : JpaRepository<Specialist, Long> {
    fun findByUsername(username: String): Specialist?
    fun findByNameContainingIgnoreCaseOrSurnameContainingIgnoreCase(name: String, surname: String): List<Specialist>
}