package com.nojank.ctl

import com.nojank.model.RedisConfig
import org.springframework.web.bind.annotation.*
import org.springframework.web.context.request.RequestContextHolder

@RestController
class RedisConfigController {
    val map = HashMap<String, RedisConfig>()

    @PostMapping
    fun newRedisConfig(@RequestBody redisConfig: RedisConfig) {
        map[RequestContextHolder.currentRequestAttributes().sessionId] = redisConfig
    }

    @CrossOrigin
    @GetMapping("/getConfig")
    fun getRedisConfig(): RedisConfig {
        val sessionId = RequestContextHolder.currentRequestAttributes().sessionId
        return map[sessionId]
            ?: RedisConfig(sessionId, "durl", "dusr", "dpwd")
    }
    @GetMapping("/test")
    fun test(): String {
        return "foo"
    }
}
