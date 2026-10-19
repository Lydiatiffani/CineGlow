
package com.moviebooking.movie_booking_system;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class BookingController {

    private Map<Long, Booking> bookings = new HashMap<>();

    @PostMapping("/api/bookings")
    public String addBooking(@RequestBody Booking booking) {
        bookings.put(booking.getBookingId(), booking);
        return "Booking successful!";
    }

    @GetMapping("/api/bookings/{id}")
    public Booking getBooking(@PathVariable long id) {
        return bookings.get(id);
    }
}
