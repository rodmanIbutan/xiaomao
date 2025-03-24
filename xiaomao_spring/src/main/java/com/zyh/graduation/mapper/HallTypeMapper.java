package com.zyh.graduation.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.zyh.graduation.entity.HallType;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HallTypeMapper extends BaseMapper<HallType> {

    @Select("select distinct * from t_hall_type where id in (select hall_type_id from t_hall h left join t_cinema c on h.cinema_id = c.id where c.isdeleted=0 and h.cinema_id=#{id})")
    List<HallType> getHallTypeByCinemaId(Integer id);

    @Select("select * from t_hall_type")
    List<HallType> getAll();
}
