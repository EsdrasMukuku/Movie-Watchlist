/// 6ad11fff
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
    .catch(error => {
        console.error('Error:', error);
        movieInput.placeholder = "Searching something with no data";
        moviesChoices.innerHTML = `<p>Unable to find what you're looking for. Please try another search.</p>`;
    });

    movieInput.value = '';
});

function renderMovies(movies) {
    for(let movie of movies) {
        const movieHTML = `<div class="movie">
            <img src="${movie.Poster}" alt="poster of the movie ${movie.Title}">
            <div class="movieDescription">
                <h2>${movie.Title} &#11088 <span>${movie.Ratings[0].Value}</span></h2>
                <p>${movie.Runtime} &nbsp  &nbsp ${movie.Genre}  &nbsp &nbsp <button class="watchlist-btn" data-title="${movie.Title}" data-poster="${movie.Poster}" data-rating="${movie.Ratings[0].Value}" data-runtime="${movie.Runtime}" data-genre="${movie.Genre}" data-plot="${movie.Plot}">
                    <i class="fa-solid fa-circle-plus"></i> Watchlist</button>
                </p>
                <p class="desc">${movie.Plot}</p>
            </div>
        </div>
        <hr />`;
        moviesChoices.innerHTML += movieHTML;

        // Add event listener to watchlist button of this movie
        const watchlistButton = moviesChoices.querySelector('.watchlist-btn');
        watchlistButton.addEventListener('click', addToWatchlist);
    }
}


function addToWatchlist(event) {
    event.preventDefault();
    const movie = {
        Title: this.getAttribute('data-title'),
        Poster: this.getAttribute('data-poster'),
        Rating: this.getAttribute('data-rating'),
        Runtime: this.getAttribute('data-runtime'),
        Genre: this.getAttribute('data-genre'),
        Plot: this.getAttribute('data-plot')
    };
    let myMovies = JSON.parse(localStorage.getItem('myMovies')) || [];
    myMovies.push(movie);
    localStorage.setItem('myMovies', JSON.stringify(myMovies));
}

// let myMovies = JSON.parse(localStorage.getItem('myMovies')) || [];
// if (myMovies.length > 0) {
//     const myMovieWatchlist = document.querySelector('#container');
//     myMovies.forEach(movie => {
//         const movieHTML = `<div class="movie">
//             <img src="${movie.Poster}" alt="poster of the movie ${movie.Title}">
//             <div class="movieDescription">
//                 <h2>${movie.Title} &#11088 <span>${movie.Rating}</span></h2>
//                 <p>${movie.Runtime} &nbsp  &nbsp ${movie.Genre}</p>
//                 <p class="desc">${movie.Plot}</p>
//             </div>
//         </div>
//         <hr />`;
//         myMovieWatchlist.innerHTML += movieHTML;
//     });
// } else {
//     console.log('No movie data found in local storage.');
// }


// let myMovies = JSON.parse(localStorage.getItem('myMovies')) || [];
// if (myMovies.length > 0) {
//     const myMovieWatchlist = document.querySelector('#container');
//     myMovies.forEach(movie => {
//         const movieHTML = `<div class="movie">
//             <img src="${movie.Poster}" alt="poster of the movie ${movie.Title}">
//             <div class="movieDescription">
//                 <h2>${movie.Title} &#11088 <span>${movie.Rating}</span></h2>
//                 <p>${movie.Runtime} &nbsp  &nbsp ${movie.Genre}</p>
//                 <p class="desc">${movie.Plot}</p>
//             </div>
//         </div>
//         <hr />`;
//         myMovieWatchlist.innerHTML += movieHTML;
//     });
// } else {
//     console.log('No movie data found in local storagevvv.');
// }
