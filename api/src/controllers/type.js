const { Type } = require("../db");
//traemos todas... ya esta e get

//agregar pokemon
/* function addType(request,response, next) {
     const type = request.body;
     return Type.create(type);
 } */

async function addType(request, response, next) {
  const type = request.body;
  if(!type) return response.send({
      error: 500,
      message: 'Nada por aquí'
  });

  try {
    const createdType = await Type.create(type);
    return response.send(createdType);
  } catch (error) {
    next(error);
  }
}

function getAllTypes(request, response, next) {
  return Type.findAll()
    .then((types) => response.send(types))
    .catch((err) => next(err));
}

module.exports = {
  getAllTypes,
  addType,
};
