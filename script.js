// 6ad11fff
fetch("http://www.omdbapi.com/?apikey=6ad11fff&s=superman")
    .then(res => res.json())
    .then(data =>  console.log(data.Search.forEach(element => {
       console.log(element.Title) 
    })))
        
    


console.log("movie");