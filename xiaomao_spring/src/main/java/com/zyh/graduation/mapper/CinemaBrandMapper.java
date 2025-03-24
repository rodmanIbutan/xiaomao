package com.zyh.graduation.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.zyh.graduation.entity.CinemaBrand;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CinemaBrandMapper extends BaseMapper<CinemaBrand> {

    @Select("select * from t_cinema_brand where id=#{brandId} and isdeleted=0")
    CinemaBrand getById(Integer brandId);

    @Select("select * from t_cinema_brand where isdeleted=0")
    List<CinemaBrand> getAll();
}
