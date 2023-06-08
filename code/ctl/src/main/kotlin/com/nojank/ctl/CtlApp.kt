package com.nojank.ctl

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class CtlApp

fun main(args: Array<String>) {
	runApplication<CtlApp>(*args)
}
