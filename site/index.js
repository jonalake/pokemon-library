const ul = document.querySelector("ul")

// add spinner image to main before fetch
// create "hidden class" display: none
// right before append hide image

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
            ul.append(pokeListing)
        })
    })