const { Type } = require("../db");
const axios = require("axios");
const { POKEMON_TYPE } = require("../../constants");


function getAllTypes(request, response, next) {
    const typeApi = axios.get(`${POKEMON_TYPE}`);
    const PokeType = Type.findAll();
    Promise.all([typeApi, PokeType])

    .then((res) => {
        let [typeApiResponse, pokeTypeResponse] = res;
        return response.send(
          pokeTypeResponse.concat(typeApiResponse.data.results)
        );
      })
      .catch((err) => next(err));
  }



module.exports = {
  getAllTypes,
 
};
