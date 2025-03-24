package com.zyh.graduation.entity.Vo;

import com.zyh.graduation.entity.Cinema;
import com.zyh.graduation.entity.Movie;
import com.zyh.graduation.entity.Snack;

import java.util.List;

public class CinemaDetail {
    private Cinema cinema;
    private List<Movie> movies;
    private List<Snack> snacks;

    public List<Snack> getSnacks() {
        return snacks;
    }

    public void setSnacks(List<Snack> snacks) {
        this.snacks = snacks;
    }

    public Cinema getCinema() {
        return cinema;
    }

    public void setCinema(Cinema cinema) {
        this.cinema = cinema;
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }
}
