package com.zyh.graduation.config.shiro;

import com.zyh.graduation.config.exception.QQMapException;
import com.zyh.graduation.config.util.Result;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.UnauthorizedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class ExceptionHandle {
    @ResponseBody
    @ExceptionHandler(UnauthorizedException.class)
    public Result handleShiroException(Exception ex) {
        return new Result(Result.ERROR,"无权限");
    }

    @ResponseBody
    @ExceptionHandler(AuthorizationException.class)
    public Result AuthorizationException(Exception ex) {
        return new Result(Result.ERROR,"权限认证失败");
    }
    @ResponseBody
    @ExceptionHandler(QQMapException.class)
    public Result QQMapException(Exception ex) {
        return new Result(Result.ERROR,"腾讯地图异常");
    }

}
