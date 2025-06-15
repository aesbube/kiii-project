package app.medview.util

import java.security.SecureRandom

object RandomIdGenerator {

    private const val ALPHANUMERIC_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    private const val ID_LENGTH = 12

    fun generateRefNumber(): String {
        val random = SecureRandom()
        val sb = StringBuilder(ID_LENGTH)
        repeat(ID_LENGTH) {
            val randomIndex = random.nextInt(ALPHANUMERIC_CHARS.length)
            sb.append(ALPHANUMERIC_CHARS[randomIndex])
        }
        return sb.toString()
    }
}