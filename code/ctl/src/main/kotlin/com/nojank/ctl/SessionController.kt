package com.nojank.ctl

import com.nojank.model.SessionConfig
import jakarta.servlet.http.HttpServletRequest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.env.Environment
import org.springframework.web.bind.annotation.*


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
}
