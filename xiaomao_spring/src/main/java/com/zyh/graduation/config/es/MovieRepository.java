package com.zyh.graduation.config.es;

import com.zyh.graduation.entity.Movie;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface MovieRepository extends ElasticsearchRepository<Movie,Integer> {

    List<Movie> findByNmLikeOrDirLikeOrCatLikeOrDraLikeOrStarContains(String key1,String key2,String key3,String key4,String key5);
}
