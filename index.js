/*
    Pokedex
    
    Write an async function 
        that uses fetch() to fetch all 
        Pokemon from pokemon.json
    
    Display all the Pokemon
        ID, English Name, 
        Type(s), 
        Stats: HP/Attack/Defense/Speed
*/

async function getPokemon() {
  const fetchPokemonResponse = await fetch("pokemon.json");
  const data = await fetchPokemonResponse.json();

  return data;
}

function createApp() {
  const h1 = document.createElement("h1");
  h1.innerText = "PokéDeck 8000";
  h1.classList.add("app-title");

  const displayContainer = document.createElement("div");

  displayContainer.classList.add("grid", "app");
  displayContainer.id = "app";
  document.body.prepend(displayContainer);
  document.body.prepend(h1);
  // const nextButton = document.createElement('a');
  // const prevButton = document.createElement('a');
  // nextButton.href = '#'
  // prevButton.href = '#'
  // nextButton.innerText = 'next'
  // prevButton.innerText = 'prev'
}

async function displayPokemon(item) {
  const {
    id,
    name: { english },
    type,
    base: { HP, Attack, Defense, Speed },
  } = item;
  const pokemonBox = document.createElement("div");
  const pokeHTML = `
        <span class='info id'>${id}</span>
        <span class='info name'>${english}</span>
        <span class='info type'>Type:<br> ${type}</span>
        <span class='info hit-point'>HP:<br> ${HP}</span>
        <span class='info attack'>Attack:<br> ${Attack}</span>
        <span class='info defense'>Defense:<br>${Defense}</span>
        <span class='info speed'>Speed:<br> ${Speed}</span>
    `;
  pokemonBox.classList.add("pokemon");
  pokemonBox.innerHTML = pokeHTML;
  const app = document.getElementById("app");
  app.prepend(pokemonBox);
}

// IIFE are a life-line to testing code as you implement them!
// https://developer.mozilla.org/en-US/docs/Glossary/IIFE
(async () => {
  createApp();
  const data = await getPokemon();
  let counter = 0;

  // iterate into an array using time.
  let intervalID = setInterval(() => {
    displayPokemon(data[counter]);
    counter++;
  }, 250);

  setTimeout(clearInterval, 500000, intervalID);
})();
