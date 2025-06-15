package app.medview.repository

import app.medview.domain.users.Pharmacist
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PharmacistRepository : JpaRepository<Pharmacist, Long> {
    fun findByUsername(username: String): Pharmacist?
}