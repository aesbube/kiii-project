package app.medview.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "app.jwt")
class JwtConfig {
    var secret: String = "defaultSecretKeyNeedsToBeAtLeast256BitsLongForHS256Algorithm"
    var expirationMs: Long = 86400000 // 24 hours
}
