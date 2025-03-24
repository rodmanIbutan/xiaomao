package com.zyh.graduation.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.zyh.graduation.entity.Order;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderMapper extends BaseMapper<Order> {
    @Select("select * from t_order where item_type='电影票' and order_uid=#{userId} order by create_time desc")
    List<Order> getMovieOrderByUser(Integer userId);
    @Select("select o.id,o.item_id,o.item_type,o.relate_id,o.`describe`,o.order_id,o.order_uid,o.price,o.create_time,o.snack_seat from t_order o LEFT JOIN(SELECT t.id,d.cinema_id FROM t_times t LEFT JOIN t_days d on t.days_id = d.id where d.day>=CURDATE()) ti on o.relate_id = ti.id where item_type='电影票' and o.order_uid=#{userId} and ti.cinema_id=#{cinemaId} order by create_time desc")
    List<Order> getMovieOrderByCinema(Integer userId, Integer cinemaId);
    @Select("select * from t_order where item_type='电影票' and order_id=#{orderId}")
    Order selectByOrderId(String orderId);
    @Select("select * from t_order where item_type='电影票' and relate_id=#{timesId} and `describe` like '%${startTime}%'")
    List<Order> getByTimesId(Integer timesId, String startTime);

    @Select("select * from t_order where item_type='小吃' and order_uid=#{userId} order by create_time desc")
    List<Order> getSnackOrderByUser(Integer userId);

    @Select("<script>" +
            "select * from t_order where 1=1 " +
            "<if test='keyword != null '>" +
            "and order_id like '%${keyword}%' " +
            "</if>" +
            "<if test='cinemaId!=null'>" +
            "and ((item_type='小吃' and relate_id=#{cinemaId})" +
            "or" +
            "(item_type='电影票' and relate_id in " +
            "(select id from t_times where days_id in " +
            "(select id from t_days where cinema_id=#{cinemaId}))))" +
            "</if>" +
            "</script>")
    List<Order> getOrders(String keyword, Integer cinemaId);
}
