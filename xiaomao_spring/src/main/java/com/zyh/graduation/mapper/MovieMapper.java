package com.zyh.graduation.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.zyh.graduation.entity.Movie;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieMapper extends BaseMapper<Movie> {

    @Select("<script>" +
            "select * from t_movie  where isdeleted=0 and showst=3 " +
            "and id in (select movie_id from t_days where cinema_id in " +
            "(select id from t_cinema c where c.isdeleted=0 and addr like '%${addr}%')) "+
            "order by watched desc,sc desc" +
            "</script>")
    List<Movie> getList(String addr);

    @Select("select * from t_movie where isdeleted=0 and showst!=3 order by rt asc,wish desc")
    List<Movie> getWait();

    @Select("select * from t_movie where isdeleted=0 and showst!=3 order by wish desc limit 0,8")
    List<Movie> getMoviePop();

    @Select("select * from t_movie where isdeleted=0 and id=#{id}")
    Movie getMovieById(Integer id);

    @Update("update t_movie set wish = wish+#{num} where isdeleted=0 and id=#{movieId}")
    void upWish(Integer movieId,Integer num);

    @Select("select * from t_movie where isdeleted=0 and nm=#{movieName}")
    Movie getMovieByName(String movieName);

    @Select("select * from t_movie where isdeleted=0")
    List<Movie> selectAll();

    @Select("<script>" +
            "select * from t_movie where isdeleted=0 and id in " +
            "(select movie_id from t_days " +
            "where cinema_id=#{cinemaId} and to_days(day)>=to_days(now()))" +
            "</script>")
    List<Movie> getMovieByCinemaIdAndDay(Integer cinemaId);

    @Select("<script>" +
            "select * from t_movie where isdeleted=0 " +
            "<if test='keyword != null'>" +
            "and (nm like '%${keyword}%' or enm like '%${keyword}%' " +
            "or cat like '%${keyword}%' or dir like '%${keyword}%' or dra like '%${keyword}%')" +
            "</if>" +
            "</script>")
    List<Movie> getMovies(String keyword);

    @Select("select * from t_movie where isdeleted=0 and id!=#{movieId} and showst!=1 and cat like '%${cat}%' limit #{limit}")
    List<Movie> getLikeMovieList(Integer movieId, String cat,Integer limit);

    @Select("select * from t_movie where isdeleted=0 and showst=3")
    List<Movie> getAllMovie();
}
