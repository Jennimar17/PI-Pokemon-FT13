const { Type } = require('../db');

function getAllTypes(request, response, next) {
    return Type.findAll()
    .then((types) =>  response.send(types))
    .catch((err) => next(err));
}

module.exports = {
    getAllTypes,
}