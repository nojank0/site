package com.nojank.ctl

import jakarta.servlet.ServletContext
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.env.Environment
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(path = ["/diag"])
class ServerInfoController {

    @Autowired
    var context: ServletContext? = null

    @Autowired
    var env: Environment? = null

    @GetMapping("/getServerInfo")
    fun getServerInfo(): ServerInfo {
        return ServerInfo("${context?.effectiveMajorVersion?:"Undefined"}.${context?.effectiveMinorVersion?:"Undefined"}",
            getCurrentProfile(env))
    }
}

fun getCurrentProfile(env: Environment?): String {
    var currentProfile = "Undefined"
    if (env != null) {
        var activeProfiles = env?.activeProfiles
        if (activeProfiles.isNullOrEmpty()) {
            activeProfiles = env?.defaultProfiles
        }
        if (!activeProfiles.isNullOrEmpty()) {
            currentProfile = activeProfiles[0].toString()
        }
    }
    return currentProfile
}

