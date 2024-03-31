// 6ad11fff
const movieInput = document.getElementById('input');
const searchBtn = document.getElementById('search');
const moviesChoices = document.querySelector(".empty");
const watchlistPage = document.getElementById('watchlistPage');
const filmPage = document.getElementById('filmPage');


searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    moviesChoices.style.color = "white";
    moviesChoices.innerHTML = '';
    
    

    fetch(`http://www.omdbapi.com/?apikey=6ad11fff&s=${movieInput.value}`)
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data => {
        if (data.Response === "False") {
            throw new Error(data.Error);
        }
        return Promise.all(data.Search.map(element => 
            fetch(`http://www.omdbapi.com/?apikey=6ad11fff&t=${element.Title}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
        ));
    })
    .then(movies => renderMovies(movies))
    .catch(error => {console.error('Error:', error),
                    movieInput.placeholder = "Searching something with no data",
                moviesChoices.innerHTML = `<p>Unable to find what you're looking for. Please try another search.</p>`});

                movieInput.value = '';
});

function renderMovies(movies) {
    let moviesHTML = '';
    for(let movie of movies) {
        moviesHTML += `<div class="movie">
            <img src="${movie.Poster}" alt="poster of the movie ${movie.Title}">
            <div class="movieDescription">
                <h2>${movie.Title} &#11088 <span>${movie.Ratings[0].Value}</span></h2>
                <p>${movie.Runtime} &nbsp  &nbsp ${movie.Genre}  &nbsp &nbsp <button class="watchlist-btn">
                    <i class="fa-solid fa-circle-plus"></i> Watchlist</button>
                </p>
                <p class="desc">${movie.Plot}</p>
            </div>
        </div>
        <hr />`;
    }
    moviesChoices.innerHTML = moviesHTML;
    
    // Add event listeners to watchlist buttons
    const watchlistButtons = document.querySelectorAll('.watchlist-btn');
    watchlistButtons.forEach(button => {
        button.addEventListener('click', addToWatchlist);
    });
}

function addToWatchlist(event) {
    // Implement functionality to add the movie to the watchlist
    // For example, you can extract movie information from the DOM and store it locally or on a server
    // You can also display a message indicating that the movie has been added to the watchlist
}

watchlistPage.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'watchlist.html';
});

filmPage.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'index.html';
});







