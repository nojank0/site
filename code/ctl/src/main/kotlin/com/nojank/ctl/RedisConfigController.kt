package com.nojank.ctl

import com.nojank.model.RedisConfig
import jakarta.servlet.http.HttpServletRequest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.env.Environment
import org.springframework.web.bind.annotation.*
import org.springframework.web.context.request.RequestContextHolder

@RestController
@RequestMapping(path = ["/ctl"])
class RedisConfigController {
    val map = HashMap<String, RedisConfig>()

    @Autowired
    var env: Environment? = null

    @PutMapping("/putRedisConfig")
    fun updateRedisConfig(@RequestBody redisConfig: RedisConfig, request: HttpServletRequest) {
        val sessionId = assembleSessionId(request)
        map[sessionId] = redisConfig
    }

    @GetMapping("/getRedisConfig")
    fun getRedisConfig(request: HttpServletRequest): RedisConfig {
        val sessionId = assembleSessionId(request)
        return map[sessionId]
            ?: RedisConfig(sessionId, getCurrentProfile(env), "durl", "dusr", "dpwd")
    }

    @GetMapping("/getSessionCount")
    fun test(): String {
        return "${map.size}"
    }
}

private fun assembleSessionId(request: HttpServletRequest): String {
    return "${RequestContextHolder.currentRequestAttributes().sessionId}${request.remoteAddr}"
}
