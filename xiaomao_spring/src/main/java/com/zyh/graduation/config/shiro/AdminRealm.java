package com.zyh.graduation.config.shiro;

import com.zyh.graduation.config.exception.AuthException;
import com.zyh.graduation.entity.AdminUser;
import com.zyh.graduation.service.AdminMenuService;
import com.zyh.graduation.service.AdminUserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class AdminRealm extends AuthorizingRealm {

    @Autowired
    private AdminUserService adminUserService;
    @Autowired
    private AdminMenuService adminMenuService;

    //授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        AdminUser adminUser = (AdminUser)principalCollection.getPrimaryPrincipal();
        List<String> userPermissions = adminMenuService.selectPermissionByUserId(adminUser.getId());
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        info.addStringPermissions(userPermissions);
        return info;
    }

    //认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        UsernamePasswordToken token = (UsernamePasswordToken) authenticationToken;
        String username = token.getUsername();
        AdminUser adminUser = adminUserService.getByUserName(username);
        if(adminUser==null)
            throw new AuthException("该用户不存在");
        Object credentials = adminUser.getPassword();
        AuthenticationInfo authcInfo = new SimpleAuthenticationInfo(adminUser, credentials, this.getClass().getSimpleName());
        return authcInfo;
    }

    @Override
    public boolean supports(AuthenticationToken authenticationToken) {
        //设置此Realm支持的Token
        return authenticationToken != null && (authenticationToken instanceof AdminToken );
    }
}
