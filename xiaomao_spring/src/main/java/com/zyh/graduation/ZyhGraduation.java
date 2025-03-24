package com.zyh.graduation;

import com.zyh.graduation.config.util.FileProperties;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@MapperScan("com.zyh.graduation.mapper")
@EnableScheduling
@EnableConfigurationProperties({
        FileProperties.class
})
public class ZyhGraduation {

    public static void main(String[] args){
        System.setProperty("es.set.netty.runtime.available.processors","false");
        SpringApplication.run(ZyhGraduation.class, args);
    }

}
