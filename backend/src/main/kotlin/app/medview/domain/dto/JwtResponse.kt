package app.medview.domain.dto

import app.medview.domain.Role

data class JwtResponse(
    val token: String,
    val type: String = "Bearer",
    val id: Long,
    val username: String,
    val role: String,
)