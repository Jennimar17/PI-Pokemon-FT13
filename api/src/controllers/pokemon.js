const axios = require("axios");
const {
  POKEMON_URL,
  SEARCH_POKEMON_ID,
  SEARCH_POKEMON_NAME,
} = require("../../constants");
const { Pokemon, Type } = require("../db");

const getPokemonsApi = async () => {
  const pokemonUrl = await axios.get(POKEMON_URL);
  const pokemonUrlNext = await axios.get(pokemonUrl.data.next);
  const pokemonsApi = pokemonUrl.data.results.concat(pokemonUrlNext.data.results);

  const pokemons = await Promise.all(
    pokemonsApi.map(async (pokemon) => {
      const poke = await axios(pokemon.url);
      const data = poke.data;
      return {
        id: data.id,
        name: data.name,
        image: data.sprites.other.dream_world.front_default,
        Types: data.types.map((type) => {
          return { name: type.type.name };
        }),

        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
      };
    })
  );
  return pokemons;
};

const getPokemonsDatabase = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
};

const getAllPokemons = async () => {
  const pokemonsApi = await getPokemonsApi();
  const pokemonsDB = await getPokemonsDatabase();
  const allPokemons = pokemonsApi.concat(pokemonsDB);
  return allPokemons;
};

const getPokemonDetail = async (searchBy, value) => {
  const pokemons = await getAllPokemons();

  switch (searchBy) {
    case SEARCH_POKEMON_NAME:
      return pokemons.filter((pokemon) => pokemon.name === value);
    case SEARCH_POKEMON_ID:
      return pokemons.filter((pokemon) => pokemon.id.toString() === value);
    default:
      return pokemons;
  }
};

module.exports = {
  getPokemonsApi,
  getPokemonsDatabase,
  getAllPokemons,
  getPokemonDetail,
};
