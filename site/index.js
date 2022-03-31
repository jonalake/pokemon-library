const ul = document.querySelector("ul")
const main = document.querySelector("main")

fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
    .then(response => response.json())
    .then((response) => {
        const pokemonList = response.results
        const httpRequests = pokemonList
            .map(pokemon => pokemon.url)
            .map(url => {
                return fetch(url).then(response => response.json())
            })

        return Promise.all(httpRequests)
    }).then(responses => {
        console.log(responses)
    })





// pokemonList
//     .map(pokemon => {
//         return pokemon.name;
//     })
//     .map((name) => {
//         return `${ name[0].toUpperCase() }${ name.slice(1) } `
//     })
//     .map((name) => {
//         const li = document.createElement("li")
//         li.textContent = name;
//         return li;
//     })
//     .forEach(li => {
//         ul.append(li)
//     })
//     });