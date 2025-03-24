package com.zyh.graduation.entity.Vo;

import com.zyh.graduation.entity.Cinema;

public class AdminCinema extends Cinema {
    private String brandName;

    public AdminCinema(Cinema cinema){
        this.setId(cinema.getId());
        this.setNm(cinema.getNm());
        this.setAddr(cinema.getAddr());
        this.setEndorse(cinema.getEndorse());
        this.setAllowrefund(cinema.getAllowrefund());
        this.setBrandId(cinema.getBrandId());
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }
}
