package app.medview.security

import app.medview.config.JwtConfig
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import jakarta.persistence.Id
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Component
import java.util.Date
import javax.crypto.SecretKey

@Component
class JwtTokenProvider(private val jwtConfig: JwtConfig) {

    private val key: SecretKey by lazy {
        Keys.hmacShaKeyFor(jwtConfig.secret.toByteArray())
    }

    fun generateToken(authentication: Authentication, userId: Long): String {
        val userDetails = authentication.principal as UserDetails
        val now = Date()
        val expiryDate = Date(now.time + jwtConfig.expirationMs)

        val role = userDetails.authorities.firstOrNull()?.authority ?: "PATIENT"
        return Jwts.builder()
            .setSubject(userDetails.username)
            .claim("role", role)
            .claim("id", userId)
            .setIssuedAt(now)
            .setExpiration(expiryDate)
            .signWith(key, SignatureAlgorithm.HS256)
            .compact()
    }

    fun getUsernameFromToken(token: String): String {
        val claims = Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .body

        return claims.subject
    }

    fun getRoleFromToken(token: String): String? {
        val claims = Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .body

        return claims["role"] as? String
    }

    fun validateToken(token: String): Boolean {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token)
            return true
        } catch (_: Exception) {
            return false
        }
    }
}
