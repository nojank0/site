package com.nojank.ctl

import com.nojank.model.RedisConfig
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

    @PostMapping
    fun newRedisConfig(@RequestBody redisConfig: RedisConfig) {
        map[RequestContextHolder.currentRequestAttributes().sessionId] = redisConfig
    }

    @CrossOrigin
    @GetMapping("/getRedisConfig")
    fun getRedisConfig(): RedisConfig {
        val sessionId = RequestContextHolder.currentRequestAttributes().sessionId
        return map[sessionId]
            ?: RedisConfig(sessionId, getCurrentProfile(env), "durl", "dusr", "dpwd")
    }
    @GetMapping("/test")
    fun test(): String {
        return "foo"
    }
}
