package com.zyh.graduation.controller.admin;

import com.zyh.graduation.entity.Cinema;
import com.zyh.graduation.service.CinemaService;
import com.zyh.graduation.config.util.PageBean;
import com.zyh.graduation.config.util.Result;
import com.zyh.graduation.entity.AdminRole;
import com.zyh.graduation.entity.AdminUser;
import com.zyh.graduation.entity.Vo.AdminOptions;
import com.zyh.graduation.service.AdminRoleService;
import com.zyh.graduation.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/admin/auser")
public class Admin_AdminUserController {

    @Autowired
    private AdminUserService adminUserService;
    @Autowired
    private CinemaService cinemaService;
    @Autowired
    private AdminRoleService adminRoleService;

    @GetMapping("/getAdmins")
    public Result getAdmins(@RequestParam("pageNum") Integer pageNum,
                            @RequestParam("limit") Integer limit,
                            @RequestParam(value = "keyword",required = false) String keyword){
        PageBean<AdminUser> adminUserPageBean = adminUserService.getAdmins(pageNum,limit,keyword);
        return new Result(adminUserPageBean);
    }

    @GetMapping("/getOptions")
    public Result getOptions(){
        List<AdminRole> res1 = adminRoleService.getRoles();
        List<Cinema> res2 = cinemaService.getAllCinema();
        AdminOptions adminOptions = new AdminOptions();
        adminOptions.setRoles(res1);
        adminOptions.setCinemas(res2);
        return new Result(adminOptions);
    }

    @PostMapping("/updateInfo")
    public Result updateInfo(@RequestBody HashMap<String,String> map){
        Integer userId = null;
        if(map.get("userId")!=null)
            userId = Integer.parseInt(map.get("userId"));
        String name = map.get("name");
        String username = map.get("username");
        String password = map.get("password");
        Integer roleId = Integer.parseInt(map.get("roleId"));
        Integer cinemaId = Integer.parseInt(map.get("cineamId"));
        AdminUser user = new AdminUser();
        user.setId(userId);
        user.setName(name);
        user.setUsername(username);
        user.setPassword(password);
        user.setCineamId(cinemaId);
        if(userId!=null)
            adminUserService.updateInfo(user);
        else {
            user.setAvatar("https://mokespace.cn/kodexplorer/index.php?share/fileProxy&user=1&sid=MEyKNFbx");
            adminUserService.insertInfo(user);
            adminRoleService.insertInfo(user.getId(),roleId);
        }
        return new Result(user);
    }
    @GetMapping("/deleteAdmin")
    public Result deleteAdmin(@RequestParam("userId") Integer userId){
        adminUserService.deleteAdmin(userId);
        return new Result();
    }
}
