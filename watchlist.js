

let myMovies = JSON.parse(localStorage.getItem('myMovies')) || [];
if (myMovies.length > 0) {
    const myMovieWatchlist = document.querySelector('#container');
    myMovies.forEach(movie => {
        const movieHTML = `<div class="movie">
            <img src="${movie.Poster}" alt="poster of the movie ${movie.Title}">
            <div class="movieDescription">
                <h2>${movie.Title} &#11088 <span>${movie.Rating}</span></h2>
                <p>${movie.Runtime} &nbsp  &nbsp ${movie.Genre}</p>
                <p class="desc">${movie.Plot}</p>
            </div>
        </div>
        <hr />`;
        
        myMovieWatchlist.innerHTML += movieHTML;
    });
} else {
    console.log('No movie data found in local storagevvv.');
}
