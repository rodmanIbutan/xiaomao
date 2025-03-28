package com.zyh.graduation.entity.Vo;

import com.zyh.graduation.entity.Movie;

public class MoviePhoto {
    private Movie movie;
    private String[] photos;

    public MoviePhoto(Movie movie) {
        this.movie = movie;
        String tmp = movie.getPhotos();

        this.photos = tmp.split(",");
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public String[] getPhotos() {
        return photos;
    }

    public void setPhotos(String[] photos) {
        this.photos = photos;
    }
}
