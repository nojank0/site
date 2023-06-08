package com.nojank.ctl

import com.nojank.model.RedisConfig
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.request.RequestContextHolder

@RestController
class RedisConfigController {

    val map = HashMap<String, RedisConfig>()
    @PostMapping
    fun newRedisConfig(@RequestBody redisConfig: RedisConfig) {
        map[RequestContextHolder.currentRequestAttributes().sessionId] = redisConfig
    }

    @GetMapping("/getConfig")
    fun getRedisConfig(): RedisConfig {
        return map[RequestContextHolder.currentRequestAttributes().sessionId]
            ?: RedisConfig("durl", "dusr", "dpwd")
    }
    @GetMapping("/test")
    fun test(): String {
        return "foo"
    }
}

