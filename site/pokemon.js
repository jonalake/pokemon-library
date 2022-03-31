const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
const main = document.querySelector("main")

fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        const name = `${response.name[0].toUpperCase()}${response.name.slice(1)}`;
        const title = document.querySelector("title");
        title.textContent = name;
        const pokemonDetails = document.createElement("div")
        pokemonDetails.classList = "pokemon-details"
        pokemonDetails.innerHTML = `
            <figure>
                <img src="${response.sprites.front_shiny}" alt="${name}" />
                <figcaption>${name}</figcaption>
            </figure>

            <h2>Abilities</h2>
            <ul class="abilities">
            </ul>
        `;
        main.append(pokemonDetails);
    })


    // < figure >
    //  <img src="${response.sprites.front_shiny}" alt="${response.species.name[0].toUpperCase()}${response.species.name.slice(1)}" />
    //                 <figcaption><a href="pokemon.html?pokemon=${response.id}">${response.species.name[0].toUpperCase()}${response.species.name.slice(1)}</a></figcaption>
    //             </figure >