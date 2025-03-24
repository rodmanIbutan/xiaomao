package com.zyh.graduation.entity.Vo;

import com.zyh.graduation.entity.Cinema;
import com.zyh.graduation.entity.HallType;

import java.util.List;

public class CinemaVo {
    private Cinema cinema;
    private List<HallType> HallTypeList;

    public Cinema getCinema() {
        return cinema;
    }

    public void setCinema(Cinema cinema) {
        this.cinema = cinema;
    }

    public List<HallType> getHallTypeList() {
        return HallTypeList;
    }

    public void setHallTypeList(List<HallType> hallTypeList) {
        HallTypeList = hallTypeList;
    }
}
