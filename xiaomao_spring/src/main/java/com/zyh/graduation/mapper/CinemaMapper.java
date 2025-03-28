package com.zyh.graduation.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.zyh.graduation.entity.Cinema;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CinemaMapper extends BaseMapper<Cinema> {

    @Select("<script>" +
            "SELECT *,(round(6367000 * 2 * asin(sqrt(pow(sin(((latitude * pi()) / 180 - (#{lat} * pi()) / 180) / 2), 2) " +
            "+ cos((#{lat} * pi()) / 180) * cos((latitude * pi()) / 180) * pow(sin(((longitude * pi()) / 180 " +
            "- (#{lng} * pi()) / 180) / 2), 2))))) AS distance " +
            "FROM `t_cinema` where isdeleted=0 and addr like '%${adrr}%' " +
            "<if test='brandId != -1'>"+
            "and brand_id=#{brandId} " +
            "</if>"+
            "<if test='serviceId == 1'>"+
            "and endorse=true " +
            "</if>"+
            "<if test='serviceId == 2'>"+
            "and allowrefund=true " +
            "</if>"+
            "<if test='hallType != -1'>"+
            "and id in " +
            "(select cinema_id from t_hall h left join t_cinema c on h.cinema_id = c.id where c.isdeleted=0 and h.hall_type_id=#{hallType}) "+
            "</if>"+
            "and id in (select cinema_id from t_days where 1=1 " +
            "<if test='movieId != null'>"+
            "and movie_id=#{movieId} " +
            "</if>"+
            "<if test='date != null'>"+
            "and day=#{date}" +
            "</if>"+
            ") ORDER BY distance asc" +
            "</script>")
    List<Cinema> getCinemas(Integer movieId,String date,BigDecimal lat,BigDecimal lng,
                            String adrr,Integer brandId,Integer serviceId,Integer hallType,String selectRegion);

    @Select("select * from t_cinema where isdeleted=0")
    List<Cinema> selectAll();

    @Select("select * from t_cinema where nm like '%${keyword}%' and isdeleted=0 or addr like '%${keyword}%' and isdeleted=0")
    List<Cinema> getCinema(String keyword);
}
