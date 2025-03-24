package com.zyh.graduation.service;

import com.zyh.graduation.mapper.DaysMapper;
import com.zyh.graduation.mapper.TimesMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TimesService {
    @Autowired
    private TimesMapper timesMapper;
    @Autowired
    private DaysMapper daysMapper;

    public void deleteMovieSchedule(Integer timesId,Integer daysId) {
        timesMapper.deleteById(timesId);
        if(daysMapper.isHashTimes(daysId)==0){
            daysMapper.deleteById(daysId);
        }
    }
}
