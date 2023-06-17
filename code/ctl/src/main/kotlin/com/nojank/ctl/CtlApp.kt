package com.nojank.ctl

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.core.env.Environment
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

const val NJAO_KEY = "njao"

@SpringBootApplication
class CtlApp {

	val log = LoggerFactory.getLogger(this.javaClass)

	@Autowired
	var env: Environment? = null

	@Bean
	fun corsConfigurer(): WebMvcConfigurer? {
		return object : WebMvcConfigurer {
			override fun addCorsMappings(registry: CorsRegistry) {
				log.info("Environment 9772sx is:  ${getCurrentProfile(env)}")
				val njao = env?.getProperty(NJAO_KEY) ?: ""
				if (njao.isNullOrEmpty()) {
					log.error("Unable to load environment property $NJAO_KEY.")
				} else {
					log.info("Registering CORS allowed origin $njao")
					registry.addMapping("/**").allowedOrigins(njao)
				}
			}
		}
	}
}

fun main(args: Array<String>) {
	LoggerFactory.getLogger("cold product").info("Starting the application 99xx5")
	runApplication<CtlApp>(*args)
}
