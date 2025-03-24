package com.zyh.graduation.service;

import com.zyh.graduation.entity.HallType;
import com.zyh.graduation.mapper.HallTypeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HallTypeService {
    @Autowired
    private HallTypeMapper hallTypeMapper;

    public List<HallType> getHallTypes() {
        return hallTypeMapper.getAll();
    }
}
