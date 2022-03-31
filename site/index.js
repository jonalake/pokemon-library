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
        responses.map(response => {
            const pokemonListing = document.createElement("div")
            pokemonListing.classList = "pokemon-listing"
            pokemonListing.innerHTML = `
                <figure>
                    <img src="${response.sprites.front_shiny}" alt="${response.species.name[0].toUpperCase()}${response.species.name.slice(1)}" />
                    <figcaption><a href="pokemon.html?pokemon=${response.id}">${response.species.name[0].toUpperCase()}${response.species.name.slice(1)}</a></figcaption>
                </figure>
            `
            return pokemonListing
        }).forEach(pokeListing => {
            main.append(pokeListing)
        })
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