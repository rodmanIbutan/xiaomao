package com.zyh.graduation.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.zyh.graduation.entity.Hall;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HallMapper extends BaseMapper<Hall> {

    @Select("<script>" +
            "select * from t_hall h left join t_cinema c on h.cinema_id = c.id where c.isdeleted=0 " +
            "<if test='cinemaId!=null'>" +
            "and h.cinema_id=#{cinemaId}" +
            "</if>" +
            "<if test='keyword!=null'>" +
            "and ( h.cinema_id in " +
            "(select id from t_cinema where nm like '%${keyword}%' and isdeleted=0)" +
            "or h.hall_type_id in " +
            "(select id from t_hall_type where hallType like '%${keyword}%'))" +
            "</if>" +
            "</script>")
    List<Hall> getHalls(String keyword, Integer cinemaId);

    @Select("select * from t_hall h left join t_cinema c on h.cinema_id = c.id where h.cinema_id=#{cinemaId} and c.isdeleted=0")
    List<Hall> getHallByCinema(Integer cinemaId);
}
