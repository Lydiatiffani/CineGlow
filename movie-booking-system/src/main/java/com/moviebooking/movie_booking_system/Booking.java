
package com.moviebooking.movie_booking_system;

public class Booking {

    private int bookingId;
    private String movieName;
    private String seats;

    public Booking(int bookingId, String movieName, String seats) {
        this.bookingId = bookingId;
        this.movieName = movieName;
        this.seats = seats;
    }

    public int getBookingId() {
        return bookingId;
    }

    public String getMovieName() {
        return movieName;
    }

    public String getSeats() {
        return seats;
    }
}
