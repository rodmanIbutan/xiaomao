package com.zyh.graduation;

import com.zyh.graduation.config.es.CinemaRepository;
import com.zyh.graduation.config.es.MovieRepository;
import com.zyh.graduation.entity.Cinema;
import com.zyh.graduation.entity.Movie;
import com.zyh.graduation.mapper.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;

import java.util.List;

@SpringBootTest
class WxWeimaiApplicationTests {

    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private CinemaRepository cinemaRepository;
    @Autowired
    private MovieMapper movieMapper;
    @Autowired
    private CinemaMapper cinemaMapper;
    @Autowired
    private SeatMapper seatMapper;
    @Autowired
    private DaysMapper daysMapper;
    @Autowired
    private TimesMapper timesMapper;

    @Test
    void contextLoads() {
        List<Movie> movieList = movieMapper.selectAll();
        for(Movie movie : movieList) {
            movieRepository.index(movie);
        }

        List<Cinema> cinemaList = cinemaMapper.selectAll();
        for(Cinema cinema : cinemaList) {
            cinema.setLocation(new GeoPoint(cinema.getLatitude().doubleValue(), cinema.getLongitude().doubleValue()));
            cinemaRepository.index(cinema);
        }
    }


}
