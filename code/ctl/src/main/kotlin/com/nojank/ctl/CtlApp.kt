package com.nojank.ctl

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.core.env.Environment
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

const val ALLOWED_ORIGIN_KEY = "njao"

@SpringBootApplication
class CtlApp {

	@Autowired
	lateinit var env: Environment

	@Bean
	fun corsConfigurer(): WebMvcConfigurer? {
		return object : WebMvcConfigurer {
			override fun addCorsMappings(registry: CorsRegistry) {
				registry.addMapping("/**").allowedOrigins(env.getProperty(ALLOWED_ORIGIN_KEY))
			}
		}
	}
}

fun main(args: Array<String>) {
	runApplication<CtlApp>(*args)
}
