package app.medview.util

import org.hibernate.engine.spi.SharedSessionContractImplementor
import org.hibernate.id.IdentifierGenerator
import org.hibernate.id.IdentityGenerator
import java.io.Serializable
import java.security.SecureRandom
import java.util.*

class PrescriptionIdGenerator : IdentifierGenerator {

    private val ALPHANUMERIC_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    private val ID_LENGTH = 12

    override fun generate(session: SharedSessionContractImplementor, `object`: Any): Serializable {
        val random = Random()
        val sb = StringBuilder(ID_LENGTH)
        for (i in 0 until ID_LENGTH) {
            val randomIndex = random.nextInt(ALPHANUMERIC_CHARS.length)
            sb.append(ALPHANUMERIC_CHARS[randomIndex])
        }
        return sb.toString()
    }
}