package app.medview.repository

import app.medview.domain.users.Doctor
import app.medview.domain.users.Specialist
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface SpecialistRepository : JpaRepository<Specialist, Long> {
    fun findByUsername(username: String): Specialist?
    fun findByNameContainingIgnoreCaseOrSurnameContainingIgnoreCase(name: String, surname: String): List<Specialist>

    @Query(
        "SELECT s FROM Specialist s WHERE " +
                "LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
                "LOWER(s.surname) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
                "LOWER(s.username) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
                "LOWER(s.email) LIKE LOWER(CONCAT('%', :keyword, '%'))"
    )
    fun searchSpecialists(@Param("keyword") keyword: String): List<Specialist>
}