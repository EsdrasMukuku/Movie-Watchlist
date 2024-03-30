// 6ad11fff
const movieInput = document.getElementById('input');
const searchBtn = document.getElementById('search');
const moviesChoices = document.querySelector(".empty");



searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    moviesChoices.style.color = "white";
    moviesChoices.innerHTML = ''
    moviesChoices.innerHTML += `<h1>${movieInput.value}</h1>`
});


fetch("http://www.omdbapi.com/?apikey=6ad11fff&s=avengers")
    .then(res => res.json())
    .then(data => {
        const fetchPromises = data.Search.map(element =>
            fetch(`http://www.omdbapi.com/?apikey=6ad11fff&t=${element.Title}`)
                .then(res => res.json())
        );
        return Promise.all(fetchPromises);
    })
    .then(movies => console.log(movies));


