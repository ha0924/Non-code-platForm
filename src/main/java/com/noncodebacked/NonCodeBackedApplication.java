package com.noncodebacked;

import com.noncodebacked.Config.RedisChatMemoryStoreConfig;
import dev.langchain4j.community.store.embedding.redis.spring.RedisEmbeddingStoreAutoConfiguration;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication(exclude = {RedisEmbeddingStoreAutoConfiguration.class})
@EnableAspectJAutoProxy(exposeProxy = true)
@MapperScan("com.noncodebacked.Mapper")


public class NonCodeBackedApplication {

	public static void main(String[] args) {
		SpringApplication.run(NonCodeBackedApplication.class, args);
	}

}
