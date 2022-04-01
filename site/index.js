const ul = document.querySelector("ul")

fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=3")
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
            const name = `${response.species.name[0].toUpperCase()}${response.species.name.slice(1)}`;
            pokemonListing.innerHTML = `
                <figure>
                    <img src="${response.sprites.front_shiny}" alt="${name}" />
                    <figcaption><a href="pokemon.html?pokemon=${response.id}">${name}</a></figcaption>
                </figure>
            `
            return pokemonListing
        }).forEach(pokeListing => {
            const spinner = document.querySelector(".spinner")
            spinner.classList.add("hidden")
            ul.append(pokeListing)
        })
    })