
package com.moviebooking.movie_booking_system;

public class Booking {

    private long bookingId;
    private String movieName;
    private String seats;

    public Booking(long bookingId, String movieName, String seats) {
        this.bookingId = bookingId;
        this.movieName = movieName;
        this.seats = seats;
    }

    public long getBookingId() {
        return bookingId;
    }

    public String getMovieName() {
        return movieName;
    }

    public String getSeats() {
        return seats;
    }
}
