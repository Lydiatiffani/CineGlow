
function goToLogin() {
    document.body.innerHTML = `
        <header class="navbar">
            <a href="index.html" class="logo">✦ CineGlow</a>
            <button class="nav-button" onclick="goHome()">← Home</button>
        </header>

        <main class="login-page">
            <section class="login-card">
                <div class="login-icon">✦</div>
                <p class="eyebrow">WELCOME TO CINEGLOW</p>
                <h1 id="form-title">Welcome <span>back.</span></h1>

                <p class="login-description" id="form-description">
                    Sign in to discover your next cinematic adventure.
                </p>

                <form id="login-form">
                    <label for="email">Email address</label>
                    <input type="email" id="email"
                        placeholder="you@example.com" required>

                    <label for="password">Password</label>
                    <input type="password" id="password"
                        placeholder="Enter your password"
                        minlength="6" required>

                    <button type="submit" class="primary-button login-submit">
                        Continue →
                    </button>
                </form>

                <p class="signup-text">
                    <span id="switch-text">New to CineGlow?</span>
                    <button id="switch-mode" type="button">Create account</button>
                </p>

                <p class="login-message" id="login-message"></p>
            </section>
        </main>
    `;

    let isSignup = false;

    const form = document.getElementById("login-form");
    const switchButton = document.getElementById("switch-mode");

    switchButton.addEventListener("click", function () {
        isSignup = !isSignup;

        document.getElementById("form-title").innerHTML =
            isSignup ? 'Create your <span>account.</span>'
                     : 'Welcome <span>back.</span>';

        document.getElementById("form-description").textContent =
            isSignup
                ? "Join CineGlow and plan your next movie night."
                : "Sign in to discover your next cinematic adventure.";

        document.getElementById("switch-text").textContent =
            isSignup ? "Already have an account?" : "New to CineGlow?";

        switchButton.textContent =
            isSignup ? "Sign in" : "Create account";

        form.querySelector('button[type="submit"]').textContent =
            isSignup ? "Create Account →" : "Continue →";
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        showMovies();
    });
}

function showMovies() {
    document.body.innerHTML = `
        <header class="navbar">
            <a href="index.html" class="logo">✦ CineGlow</a>
            <button class="nav-button" onclick="goHome()">← Home</button>
        </header>

        <main class="experience">
            <p class="eyebrow">YOUR NEXT CINEMATIC ESCAPE</p>
            <h1>Pick your <span>movie.</span></h1>
            <p class="login-description">Choose a film for your next movie night.</p>
            <div id="movie-list" class="feature-grid">
                <p>Loading movies...</p>
            </div>
            <p id="movie-message" class="login-message"></p>
        </main>
    `;

    const posterUrls = {
        "Interstellar":
            "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        "Inception":
            "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        "The Conjuring":
            "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHTa7Np7Y.jpg",
        "Leo":
            "https://image.tmdb.org/t/p/w500/3w1l6X5X1Q6F7Q8F8q8b0Q4F0jV.jpg",
        "Vikram":
            "https://image.tmdb.org/t/p/w500/5QW0Yp7rQ0bQ6sQ6vQ4kQ8Q8Q8Q.jpg"
    };

    fetch("https://cineglow-zdz6.onrender.com/api/movies")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not load movies.");
            }
            return response.json();
        })
        .then(function (movies) {
            const movieList = document.getElementById("movie-list");
            movieList.innerHTML = "";

            movies.forEach(function (movie) {
                const card = document.createElement("article");
                card.className = "feature-card";

                const poster = document.createElement("img");
                poster.className = "movie-poster";
                poster.src = posterUrls[movie.title] || "";
                poster.alt = movie.title + " poster";
                poster.loading = "lazy";

                poster.onerror = function () {
                    poster.style.display = "none";
                };

                const title = document.createElement("h3");
                title.textContent = movie.title;

                const genre = document.createElement("p");
                genre.textContent = "Genre: " + movie.genre;

                const rating = document.createElement("p");
                rating.textContent = "⭐ Rating: " + movie.rating + "/10";

                const button = document.createElement("button");
                button.className = "primary-button";
                button.textContent = "Choose Movie →";

                button.addEventListener("click", function () {
                    showSeats(movie);
                });

                card.append(poster, title, genre, rating, button);
                movieList.appendChild(card);
            });
        })
        .catch(function () {
            document.getElementById("movie-list").textContent =
                "Couldn't load movies. Please check that the backend is running.";
        });
}

function showSeats(movie) {
    const pricePerSeat = 180;
    const selectedSeats = new Set();

    // These seats are marked as booked for this demo only.
    const bookedSeats = ["B3", "B4", "D5", "D6"];

    document.body.innerHTML = `
        <header class="navbar">
            <a href="index.html" class="logo">✦ CineGlow</a>
            <button class="nav-button" id="back-movies">← Movies</button>
        </header>

        <main class="experience seat-page">
            <p class="eyebrow">YOUR CINEMA EXPERIENCE</p>
            <h1>Choose your <span>seats.</span></h1>
            <p class="login-description" id="selected-movie"></p>

            <section class="seat-panel">
                <div class="screen">SCREEN THIS WAY</div>

                <div class="seat-legend">
                    <span><i class="seat available"></i> Available</span>
                    <span><i class="seat selected"></i> Selected</span>
                    <span><i class="seat booked"></i> Booked</span>
                </div>

                <div id="seat-layout" class="seat-layout"></div>

                <div class="booking-total">
                    <div>
                        <p>Selected seats</p>
                        <strong id="seat-names">None</strong>
                    </div>
                    <div>
                        <p>Total price</p>
                        <strong id="total-price">₹0</strong>
                    </div>
                </div>

                <button id="continue-booking"
                    class="primary-button login-submit" disabled>
                    Continue to Booking →
                </button>

                <p id="seat-message" class="login-message"></p>
            </section>
        </main>
    `;

    document.getElementById("selected-movie").textContent =
        movie.title + " · " + movie.genre + " · ₹" + pricePerSeat + " per seat";

    document.getElementById("back-movies").addEventListener("click", showMovies);

    const layout = document.getElementById("seat-layout");
    const rows = ["A", "B", "C", "D", "E"];
    const seatsPerRow = 8;

    rows.forEach(function (row) {
        const rowElement = document.createElement("div");
        rowElement.className = "seat-row";

        const rowLabel = document.createElement("span");
        rowLabel.className = "row-label";
        rowLabel.textContent = row;
        rowElement.appendChild(rowLabel);

        for (let number = 1; number <= seatsPerRow; number++) {
            const seatName = row + number;
            const seat = document.createElement("button");

            seat.type = "button";
            seat.className = "seat available";
            seat.textContent = number;
            seat.setAttribute("aria-label", "Seat " + seatName);

            if (bookedSeats.includes(seatName)) {
                seat.className = "seat booked";
                seat.disabled = true;
                seat.title = "Already booked";
            } else {
                seat.addEventListener("click", function () {
                    if (selectedSeats.has(seatName)) {
                        selectedSeats.delete(seatName);
                        seat.className = "seat available";
                    } else {
                        selectedSeats.add(seatName);
                        seat.className = "seat selected";
                    }

                    updateTotal();
                });
            }

            rowElement.appendChild(seat);

            if (number === 4) {
                const aisle = document.createElement("span");
                aisle.className = "seat-aisle";
                rowElement.appendChild(aisle);
            }
        }

        layout.appendChild(rowElement);
    });

    function updateTotal() {
        const seats = Array.from(selectedSeats).sort();

        document.getElementById("seat-names").textContent =
            seats.length ? seats.join(", ") : "None";

        document.getElementById("total-price").textContent =
            "₹" + (seats.length * pricePerSeat);

        document.getElementById("continue-booking").disabled =
            seats.length === 0;
    }

    document.getElementById("continue-booking").addEventListener(
        "click",
        function () {
            showBookingSummary(movie, Array.from(selectedSeats).sort(), pricePerSeat);
        }
    );
}

function showBookingSummary(movie, seats, pricePerSeat) {
    document.body.innerHTML = `
        <header class="navbar">
            <a href="index.html" class="logo">✦ CineGlow</a>
            <button class="nav-button" id="back-seats">← Back to Seats</button>
        </header>

        <main class="experience">
            <p class="eyebrow">ALMOST MOVIE TIME</p>
            <h1>Your booking <span>summary.</span></h1>

            <section class="login-card summary-card">
                <h2 id="summary-title"></h2>
                <p id="summary-seats"></p>
                <p id="summary-count"></p>
                <h2 id="summary-price"></h2>

                <button id="confirm-demo" class="primary-button login-submit">
                    Confirm Demo Booking 🎟️
                </button>

                <p id="summary-message" class="login-message"></p>
            </section>
        </main>
    `;

    document.getElementById("summary-title").textContent = movie.title;
    document.getElementById("summary-seats").textContent =
        "Seats: " + seats.join(", ");
    document.getElementById("summary-count").textContent =
        "Number of tickets: " + seats.length;
    document.getElementById("summary-price").textContent =
        "Total: ₹" + (seats.length * pricePerSeat);

    document.getElementById("back-seats").addEventListener("click", function () {
        showSeats(movie);
    });

    document.getElementById("confirm-demo").addEventListener("click", function () {
        document.getElementById("summary-message").textContent =
            "Demo booking complete! No payment was taken and no booking was saved.";
        document.getElementById("confirm-demo").disabled = true;
        document.getElementById("confirm-demo").textContent = "Demo Complete ✓";
    });
}

function goHome() {
    window.location.reload();
}
