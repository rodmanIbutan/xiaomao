package com.zyh.graduation.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.zyh.graduation.entity.AdminUser;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminUserMapper extends BaseMapper<AdminUser> {

    @Select("select * from t_admin_user where username=#{username}")
    AdminUser getByUserName(String username);

    @Select("<script>" +
            "select * from t_admin_user where" +
            " name like '%${keyword}%'" +
            "</script>")
    List<AdminUser> getAdminsByKeword(String keyword);
}
