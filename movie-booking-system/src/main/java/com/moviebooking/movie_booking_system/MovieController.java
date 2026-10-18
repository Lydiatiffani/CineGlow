
package com.moviebooking.movie_booking_system;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin(origins = "*")

@RestController
public class MovieController {

    @GetMapping("/api/movies")
    public List<Movie> getMovies() {
        return Arrays.asList(
            new Movie(1, "Leo", "Action", 8.2),
            new Movie(2, "Interstellar", "Sci-Fi", 8.7),
            new Movie(3, "Inception", "Thriller", 8.8),
            new Movie(4, "The Conjuring", "Horror", 7.5),
            new Movie(5, "Vikram", "Action", 8.3)
        );
    }
}
