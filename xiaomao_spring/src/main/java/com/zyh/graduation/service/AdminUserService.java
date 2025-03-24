package com.zyh.graduation.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.zyh.graduation.config.util.PageBean;
import com.zyh.graduation.entity.AdminUser;
import com.zyh.graduation.mapper.AdminRoleMapper;
import com.zyh.graduation.mapper.CinemaMapper;
import com.zyh.graduation.mapper.AdminUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminUserService {
    @Autowired
    private AdminUserMapper adminUserMapper;
    @Autowired
    private CinemaMapper cinemaMapper;
    @Autowired
    private AdminRoleMapper adminRoleMapper;

    public AdminUser getByUserName(String username) {
        return adminUserMapper.getByUserName(username);
    }

    public PageBean<AdminUser> getAdmins(Integer pageNum, Integer limit, String keyword) {
        PageHelper.startPage(pageNum,limit);
        List<AdminUser> adminUsers = adminUserMapper.getAdminsByKeword(keyword);
        PageInfo<AdminUser> pageInfo = new PageInfo<>(adminUsers);
        for(AdminUser adminUser : adminUsers){
            if(adminUser.getCineamId()!=null)
                adminUser.setCinemaNm(cinemaMapper.selectById(adminUser.getCineamId()).getNm());
            adminUser.setRoleId(adminRoleMapper.getByUserId(adminUser.getId()).getId());
        }
        PageBean<AdminUser> page = new PageBean<>();
        page.setPc(pageInfo.getPageNum());
        page.setPs(pageInfo.getPageSize());
        page.setTr(pageInfo.getPages());
        page.setBeanList(adminUsers);
        return page;
    }

    public void updateInfo(AdminUser user) {
        adminUserMapper.updateById(user);
    }

    public void insertInfo(AdminUser user) {
        adminUserMapper.insert(user);
    }
    public void deleteAdmin(Integer id) {
        adminUserMapper.deleteById(id);
    }
}
