package com.nojank.ctl

import com.nojank.model.SessionConfig
import jakarta.servlet.http.HttpServletRequest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.env.Environment
import org.springframework.web.bind.annotation.*
import java.net.Socket


@RestController
@RequestMapping(path = ["/ct"])
class SessionController {
    val map = HashMap<String, SessionConfig>()

    @Autowired
    var env: Environment? = null

    @PutMapping("/putSessionConfig")
    fun updateSessionConfig(@RequestBody sessionConfig: SessionConfig, request: HttpServletRequest) {
        val sessionPack = assembleSessionPack(request)
        map[sessionPack.key()] = sessionConfig
    }

    @GetMapping("/getSessionConfig")
    fun getSessionConfig(request: HttpServletRequest): SessionConfig {
        val sessionPack = assembleSessionPack(request)
        return map[sessionPack.key()]
            ?: SessionConfig(sessionPack.ssn, sessionPack.ipa, getCurrentProfile(env), "", "", "")
    }

    @GetMapping("/getSessionCount")
    fun getSessionCount(): String {
        return "${map.size}"
    }

    /**
     * Only called in local test environments. On a production server, this would be intercepted by nginx to return the
     * client ip.
     */
    @GetMapping("/ip")
    fun getIp(): String {
        return "{\"ip\":\"${Socket().localAddress.hostAddress}\"}"
    }
}
