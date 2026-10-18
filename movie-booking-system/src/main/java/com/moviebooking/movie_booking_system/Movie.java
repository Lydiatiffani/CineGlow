
package com.moviebooking.movie_booking_system;

public class Movie {

    private int id;
    private String title;
    private String genre;
    private double rating;

    public Movie(int id, String title, String genre, double rating) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.rating = rating;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getGenre() {
        return genre;
    }

    public double getRating() {
        return rating;
    }
}
