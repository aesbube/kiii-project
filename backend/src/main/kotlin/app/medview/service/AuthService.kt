package app.medview.service


import app.medview.domain.dto.JwtResponse
import app.medview.domain.dto.LoginRequest
import app.medview.domain.dto.MessageResponse
import app.medview.domain.dto.SignupRequest

interface AuthService {
    fun authenticateUser(loginRequest: LoginRequest): JwtResponse
    fun registerUser(signupRequest: SignupRequest): MessageResponse
}