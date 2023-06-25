package com.nojank.ctl

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.core.env.Environment
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import java.net.http.HttpClient

const val ALLOWED_ORIGIN_KEY = "njao"

@SpringBootApplication
class CtlApp {

	@Autowired
	lateinit var env: Environment

	@Bean
	fun corsConfigurer(): WebMvcConfigurer? {
		return object : WebMvcConfigurer {
			override fun addCorsMappings(registry: CorsRegistry) {
				registry.addMapping("/**").allowedOrigins(env.getProperty(ALLOWED_ORIGIN_KEY)).allowedMethods(
					RequestMethod.GET.name, RequestMethod.PUT.name)
			}
		}
	}
}

fun main(args: Array<String>) {
	runApplication<CtlApp>(*args)
}
