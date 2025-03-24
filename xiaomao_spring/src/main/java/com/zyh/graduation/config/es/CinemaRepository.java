package com.zyh.graduation.config.es;

import com.zyh.graduation.entity.Cinema;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface CinemaRepository extends ElasticsearchRepository<Cinema,Integer> {


}
