package com.zyh.graduation.config.es;

import com.zyh.graduation.config.redis.RedisConfig;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

@Configuration
@AutoConfigureBefore(RedisConfig.class)
public class ElasticConfig {
    @PostConstruct
    void init() {
        System.setProperty("es.set.netty.runtime.available.processors", "false");
    }
}
