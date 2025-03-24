package com.zyh.graduation.config.exception;

import org.apache.shiro.authc.AuthenticationException;

public class AuthException extends AuthenticationException {
    public AuthException(String msg){
        super(msg);
    }
}
