package com.zyh.graduation.config.shiro;

import com.zyh.graduation.entity.User;
import org.apache.shiro.authc.UsernamePasswordToken;

import java.io.Serializable;

//MyOpenIdToken
public class WxToken extends UsernamePasswordToken implements Serializable {
    private User user;
    /**
     *
     */
    private static final long serialVersionUID = 4812793519945855483L;
    @Override
    public Object getPrincipal() {
        return getOpenId();
    }

    @Override
    public Object getCredentials() {
        return "ok";
    }
    public WxToken(User user){
        this.user=user;
    }

    public String getOpenId() {
        return user.getOpenId();
    }

    public User getUser() {
        return user;
    }
}
