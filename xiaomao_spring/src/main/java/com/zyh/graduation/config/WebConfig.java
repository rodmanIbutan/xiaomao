package com.zyh.graduation.config;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 静态资源配置类
 */

@Configuration
public class WebConfig implements WebMvcConfigurer {
    static final String LOCAL_PATH="file:/C:/Users/Rodman/project/weimai-wetapp-master/xiaomao/upFile/";
    static final String SERVER_PATH="file:/businesscard/static/img/";


    public void addResourceHandlers(org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/upFile/**").addResourceLocations(LOCAL_PATH);
    }

}
