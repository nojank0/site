package com.nojank.ctl

import jakarta.servlet.http.HttpServletRequest
import org.springframework.web.context.request.RequestContextHolder

data class SessionPack(val ssn: String, val ipa: String) {
    fun key(): String {
        return "$ssn:$ipa"
    }
}

fun assembleSessionPack(request: HttpServletRequest): SessionPack {
    return SessionPack(RequestContextHolder.currentRequestAttributes().sessionId, request.remoteAddr)
}
