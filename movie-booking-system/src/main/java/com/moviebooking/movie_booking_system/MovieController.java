
package com.moviebooking.movie_booking_system;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class MovieController {

    @GetMapping("/api/movies")
    public List<Movie> getMovies() {

        List<Movie> movies = new ArrayList<>();

        movies.add(new Movie(1, "Leo", "Action", 8.2));
        movies.add(new Movie(2, "Interstellar", "Sci-Fi", 8.7));
        movies.add(new Movie(3, "Inception", "Thriller", 8.8));
        movies.add(new Movie(4, "The Conjuring", "Horror", 7.5));
        movies.add(new Movie(5, "Vikram", "Action", 8.3));

        return movies;
    }
}
