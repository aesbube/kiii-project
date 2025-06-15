package app.medview.web

import app.medview.domain.dto.JwtResponse
import app.medview.domain.dto.LoginRequest
import app.medview.domain.dto.MessageResponse
import app.medview.domain.dto.SignupRequest
import app.medview.service.AuthService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = ["http://localhost:4200"])
class AuthController(
    private val authService: AuthService
) {
    @PostMapping("/login")
    fun authenticateUser(@Valid @RequestBody loginRequest: LoginRequest): ResponseEntity<JwtResponse> {
        val jwtResponse = authService.authenticateUser(loginRequest)
        return ResponseEntity.ok(jwtResponse)
    }

    @PostMapping("/register")
    fun registerUser(@Valid @RequestBody signupRequest: SignupRequest): ResponseEntity<MessageResponse> {
        val response = authService.registerUser(signupRequest)
        return ResponseEntity.ok(response)
    }
}